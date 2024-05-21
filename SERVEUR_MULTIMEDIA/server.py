from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
import numpy as np

app = Flask(__name__)
port = 3000

TF_MODEL_FILE_PATH = 'model/weather_classification_model.tflite'
TF_MODEL_CLASS_NAMES = ['cloudy', 'foggy', 'rainy', 'shine', 'sunrise']


def get_tf_model(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    return interpreter.get_signature_runner('serving_default')


def process_img(img_data):
    img = Image.open(io.BytesIO(img_data))
    img = img.resize((180, 180))
    img_array = image.img_to_array(img)
    return np.expand_dims(img_array, axis=0)


def predict_img(model, img_array):
    predictions = model(sequential_1_input=img_array)['outputs']
    score = tf.nn.softmax(predictions)
    return jsonify({'prediction': TF_MODEL_CLASS_NAMES[np.argmax(score)], 'score': 100 * np.max(score)})


@app.route('/predict', methods=['POST'])
def predict():
    model = get_tf_model(TF_MODEL_FILE_PATH)
    img_data = request.data
    img_array = process_img(img_data)
    return predict_img(model, img_array)


if __name__ == '__main__':
    app.run(port=port, debug=True)
