from flask import Flask, request, jsonify, send_file
import os
import shutil
import cv2
import numpy as np

app = Flask(__name__)
port = 3000

# Configure Flask to use the /tmp and /images directories
app.config['UPLOAD_FOLDER'] = '/tmp'
app.config['IMAGES_FOLDER'] = '/images'

def detect_weather(image_path):
    # Read the image
    image = cv2.imread(image_path)

    # Convert the image to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define color ranges for different weather conditions
    sunny_lower = np.array([20, 50, 50])
    sunny_upper = np.array([40, 255, 255])

    cloudy_lower = np.array([80, 0, 150])
    cloudy_upper = np.array([160, 80, 255])

    rainy_lower = np.array([100, 50, 50])
    rainy_upper = np.array([140, 255, 255])

    snowy_lower = np.array([0, 0, 150])
    snowy_upper = np.array([180, 50, 255])

    # Create masks for different weather conditions
    mask_sunny = cv2.inRange(hsv, sunny_lower, sunny_upper)
    mask_cloudy = cv2.inRange(hsv, cloudy_lower, cloudy_upper)
    mask_rainy = cv2.inRange(hsv, rainy_lower, rainy_upper)
    mask_snowy = cv2.inRange(hsv, snowy_lower, snowy_upper)

    # Combine the masks
    mask = cv2.bitwise_or(mask_sunny, cv2.bitwise_or(mask_cloudy, cv2.bitwise_or(mask_rainy, mask_snowy)))

    # Apply the mask to the original image
    result = cv2.bitwise_and(image, image, mask=mask)

    # Calculate the percentage of pixels for each weather condition
    total_pixels = np.sum(mask > 0)
    sunny_pixels = np.sum(mask_sunny > 0)
    cloudy_pixels = np.sum(mask_cloudy > 0)
    rainy_pixels = np.sum(mask_rainy > 0)
    snowy_pixels = np.sum(mask_snowy > 0)

    # Calculate percentages
    percentage_sunny = (sunny_pixels / total_pixels) * 100 if total_pixels > 0 else 0
    percentage_cloudy = (cloudy_pixels / total_pixels) * 100 if total_pixels > 0 else 0
    percentage_rainy = (rainy_pixels / total_pixels) * 100 if total_pixels > 0 else 0
    percentage_snowy = (snowy_pixels / total_pixels) * 100 if total_pixels > 0 else 0

    # Set thresholds for different weather conditions
    sunny_threshold = 10
    cloudy_threshold = 10
    rainy_threshold = 5
    snowy_threshold = 5

    # Determine the predominant weather condition
    if percentage_sunny > sunny_threshold:
        return "Sunny"
    elif percentage_cloudy > cloudy_threshold:
        return "Cloudy"
    elif percentage_rainy > rainy_threshold:
        return "Rainy"
    elif percentage_snowy > snowy_threshold:
        return "Snowy"
    else:
        return "Unknown"


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

    weather_condition = detect_weather(os.path.join(os.getcwd()+app.config['IMAGES_FOLDER'], file.filename))
    print(f'Predicted Weather: {weather_condition}')

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