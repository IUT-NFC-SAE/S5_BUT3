from flask import Flask, request, jsonify, send_from_directory
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
import numpy as np
import socket
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

PORT = int(os.environ.get("PORT", 5000))
SERVER_TCP_PORT = int(os.environ.get("SERVER_TCP_PORT"))
SERVER_TCP_HOST = os.environ.get('SERVER_TCP_HOST')
TF_MODEL_FILE_PATH = 'model/weather_classification_model.tflite'
TF_MODEL_CLASS_NAMES = ['cloudy', 'foggy', 'rainy', 'shine', 'sunrise']
IMAGE_FOLDER = 'processed_images'


def get_tf_model(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()  # Allocate tensors before using the model
    return interpreter.get_signature_runner('serving_default')


def process_img(img_data):
    img = Image.open(io.BytesIO(img_data))
    img = img.resize((180, 180))
    img_array = image.img_to_array(img)
    return np.expand_dims(img_array, axis=0)


def predict_img(model, img_array):
    predictions = model(sequential_1_input=img_array)['outputs']
    score = tf.nn.softmax(predictions)
    return {'prediction': TF_MODEL_CLASS_NAMES[np.argmax(score)], 'score': 100 * np.max(score)}


def send_prediction_to_tcp_server(prediction, img_name):
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    message = f'STOREIMAGEANALYSIS {current_time} {prediction["prediction"]} {prediction["score"]:.2f} {img_name}'
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((SERVER_TCP_HOST, SERVER_TCP_PORT))
        s.sendall(message.encode('utf-8'))
    print(f"Sent message to TCP server: {message}")


def save_image(img_data, path):
    image = Image.open(io.BytesIO(img_data))
    os.makedirs(os.path.dirname(f'{IMAGE_FOLDER}/{path}'), exist_ok=True)
    image.save(f'{IMAGE_FOLDER}/{path}')


@app.route('/predict', methods=['POST'])
def predict():
    img_name = f'{datetime.now().strftime('%Y%m%d%H%M%S')}.png'
    img_data = request.data
    save_image(img_data, img_name)

    model = get_tf_model(TF_MODEL_FILE_PATH)
    img_array = process_img(img_data)
    prediction = predict_img(model, img_array)

    send_prediction_to_tcp_server(prediction, img_name)
    return jsonify(prediction)


@app.route('/images/<path:filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_from_directory(IMAGE_FOLDER, filename)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)