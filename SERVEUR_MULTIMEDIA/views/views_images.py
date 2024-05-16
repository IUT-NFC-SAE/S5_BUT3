from flask import request
from image_processing import use_tensorflow_model

def receive_image(): 
    try: 
        if "image" not in request.files:
            return "Aucun fichier reçu", 400
        
        file = request.files['image']
        
        if file.filename == '':
            return "Aucun fichier sélectionné", 400
        
        result, score = use_tensorflow_model(file)
        
        return result, 200
    
    except Exception as e: 
        return f"Une erreur s'est produite : {str(e)}", 500
