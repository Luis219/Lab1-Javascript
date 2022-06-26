import glob
import io
import os
import uuid
#importación de librerías
import numpy as np
from flask import Flask, jsonify, make_response, render_template, request
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

#instancia de la aplicación
app = Flask(__name__)

#clave secreta de la aplicación
app.secret_key = "luisparedez"

#rutas de la carpeta templates/static
app._static_folder = os.path.abspath("templates/static/")

#ruta de la página principal index
@app.route("/")
def index():
    """
    funcion que renderiza la página principal

    Retorno
    ------
    Renderiza la página principal (block_hopper.html)

    """

    return render_template("layouts/block_hopper.html")


if __name__ == "__main__":
    """
    Ejecucion de la aplicacion
    """
    app.run(host="0.0.0.0", port=5000, debug = True)
