from flask import Flask, request, jsonify, send_file
import os
import shutil
import cv2
import numpy as np
import PIL
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential


class_names = ['cloudy', 'foggy', 'rainy', 'shine', 'sunrise']
app = Flask(__name__)
port = 3000

# Configure Flask to use the /tmp and /images directories
app.config['UPLOAD_FOLDER'] = '/tmp'
app.config['IMAGES_FOLDER'] = '/images'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(os.getcwd() + app.config['IMAGES_FOLDER'], exist_ok=True)

TF_MODEL_FILE_PATH = 'weather_classification_model.tflite'
interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
classify_lite = interpreter.get_signature_runner('serving_default')

# Route for uploading images
@app.route('/upload', methods=['POST'])
def upload_file():
    print('hit')
    if 'photo' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['photo']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the uploaded file to /tmp
    filepath_tmp = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath_tmp)
    filepath_here = os.path.join(os.getcwd()+app.config['IMAGES_FOLDER'], file.filename)
    shutil.copy(filepath_tmp, filepath_here)

    img = tf.keras.utils.load_img(
        filepath_here, target_size=(180, 180)
    )

    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions_lite = classify_lite(sequential_1_input=img_array)['outputs']
    score_lite = tf.nn.softmax(predictions_lite)
    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(class_names[np.argmax(score_lite)], 100 * np.max(score_lite))
    )

    return jsonify({'message': 'Image uploaded successfully'})

# Route for listing all uploaded images
@app.route('/list-images', methods=['GET'])
def list_images():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    fileList = [{'name': file} for file in files]
    return jsonify(fileList)

# Route for retrieving a specific image
@app.route('/image/<filename>', methods=['GET'])
def get_image(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    app.run(port=port, debug=True)