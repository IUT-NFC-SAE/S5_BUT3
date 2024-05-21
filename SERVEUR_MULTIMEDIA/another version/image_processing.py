import numpy as np
import tensorflow as tf

def use_tensorflow_model(image_name) :
  img_height = 180
  img_width = 180
  
  image_path = tf.keras.utils.get_file(image_name, origin='./')
  
  img = tf.keras.utils.load_img(
    image_path, target_size=(img_height, img_width)
  )
  
  # Chemin vers le modèle TensorFlow Lite
  TF_MODEL_FILE_PATH = str('./weather_classification_model.tflite')

  # Chargement du modèle TensorFlow Lite
  interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
  classify_lite = interpreter.get_signature_runner('serving_default')

  # Préparation des données d'entrée
  img_array = tf.keras.utils.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0)  # Create a batch

  # Définition des noms de classes
  class_names = ['cloudy', 'foggy', 'rainy', 'shine', 'sunrise']

  # Exécution de l'inférence et affichage des résultats
  predictions_lite = classify_lite(sequential_1_input=img_array)['outputs']
  score_lite = tf.nn.softmax(predictions_lite)
  
  result = class_names[np.argmax(score_lite)]
  score = 100 * np.max(score_lite)
  
  print(result, score)
  return result, score
  
  

























# # Définition des dimensions de l'image d'entrée
# img_height = 180
# img_width = 180

# # Définition du répertoire de données
# data_dir = pathlib.Path(".")

# # URL de l'image à télécharger
# image_url = "https://media.istockphoto.com/id/503284599/photo/rainy-weather.jpg?s=612x612&w=0&k=20&c=pV38CVp0CLArYEZ6OUWnaqo6J5mo4JpbEZd61Vxr_I4="
# image_name = image_url.split("/")[-1]
# image_name = re.sub(r'[\\/*?:"<>|]', "_", image_name)
# image_path = tf.keras.utils.get_file(image_name, origin=image_url)

# # Chargement de l'image
# img = tf.keras.utils.load_img(
#     image_path, target_size=(img_height, img_width)
# )

# # Chemin vers le modèle TensorFlow Lite
# TF_MODEL_FILE_PATH = str(pathlib.Path(data_dir).parent / 'weather_classification_model.tflite')

# # Chargement du modèle TensorFlow Lite
# interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
# classify_lite = interpreter.get_signature_runner('serving_default')

# # Préparation des données d'entrée
# img_array = tf.keras.utils.img_to_array(img)
# img_array = tf.expand_dims(img_array, 0)  # Create a batch

# # Définition des noms de classes
# class_names = ['cloudy', 'foggy', 'rainy', 'shine', 'sunrise']

# # Exécution de l'inférence et affichage des résultats
# predictions_lite = classify_lite(sequential_1_input=img_array)['outputs']
# score_lite = tf.nn.softmax(predictions_lite)
# print("This image most likely belongs to {} with a {:.2f} percent confidence.".format(class_names[np.argmax(score_lite)], 100 * np.max(score_lite)))

# # Retourner le class name et le score 
