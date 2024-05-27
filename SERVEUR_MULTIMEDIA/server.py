from flask import Flask, request, jsonify
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


def save_prediction_to_tcp_server(prediction):
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    message = f'STOREIMAGEANALYSIS {current_time} {prediction["prediction"]} {prediction["score"]:.2f}'
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((SERVER_TCP_HOST, SERVER_TCP_PORT))
        s.sendall(message.encode('utf-8'))
    print(f"Sent message to TCP server: {message}")


@app.route('/predict', methods=['POST'])
def predict():
    model = get_tf_model(TF_MODEL_FILE_PATH)
    img_data = request.data
    img_array = process_img(img_data)
    prediction = predict_img(model, img_array)
    save_prediction_to_tcp_server(prediction)
    return jsonify(prediction)


if __name__ == '__main__':
    app.run(port=PORT, debug=True)