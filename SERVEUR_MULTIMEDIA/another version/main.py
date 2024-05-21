import flask

from views import views_images

app = flask.Flask(__name__)
app.config['DEBUG'] = True


@app.route("/")
def home () : 
  return "Serveur de traitement d'image reçues depuis l'application mobile"

app.add_url_rule('/api/receive_image', methods=['POST'], view_func=views_images.receive_image)

if __name__ == "__main__": 
  app.run(host="0.0.0.0")