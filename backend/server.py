from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import os
import tensorflow as tf
import numpy as np
import cv2
import easyocr
import re

#need to setup security with firebase

app = Flask(__name__)
CORS(app)

reader = easyocr.Reader(['en'], gpu=False)
new_model = load_model(os.path.join('models', 'eczemaclassifier.h5'))

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/escan', methods=['POST'])
def escan():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    resize = tf.image.resize(img, (256,256))
    yhat = new_model.predict(np.expand_dims(resize/255, 0))
    prediction = ''
    if yhat > 0.5:
        prediction = 'Predicted class is healthy'
    else:
        prediction = 'Predicted class is flared up'
    return jsonify({'prediction': prediction})

@app.route('/pscan', methods=['POST'])
def pscan():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400
    try:
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        irritating_ingredients = {
            "Linalool",
            "Limonene",
            "Citronellol",
            "Eugenol",
            "Geraniol",
            "Methylisothiazolinone",
            "Methylparaben",
            "Propylparaben",
            "Isopropyl Myristate",
            "Sodium Lauryl Sulfate",
            "Sodium Chloride",
            "Dimethicone",
            "Ceteareth-20",
            "Cocamidopropyl Betaine",
            "Benzophenone-3",
            "Tetrasodium EDTA",
            "Butylated HydroxyToluene",
            "Benzyl Alcohol",
            "Phenoxyethanol",
            "Fragrance",
            "Parfum"
        }
        result = reader.readtext(img)
        text = ""
        start = False
        for i in result:
            if "Ingredients" in i[1] or "ingredients" in i[1]:
                start = True
            if start == False:
                continue
            if "Directions" in i[1] or "Questions" in i[1]:
                break
            text += i[1] + " "
        match = re.search(r'ingredients?:?\s*(.*)', text, re.IGNORECASE)
        if match:
            ingredients_part = match.group(1)
        else:
            ingredients_part = text
        ingredients_list = re.split(r'[,;:]', ingredients_part)
        ingredients_set = {item.strip() for item in ingredients_list if item.strip()}
        common_ingredients=ingredients_set.intersection(irritating_ingredients)
        print(common_ingredients)
        res = list(common_ingredients)
        return jsonify({'results': res})
    except Exception as e:
        return jsonify({"error": f"An error occurred during OCR: {str(e)}"}), 500
    
if __name__ == '__main__':
    app.run(debug=True)