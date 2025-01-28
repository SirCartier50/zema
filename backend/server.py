from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import os
import tensorflow as tf
import numpy as np
import cv2

#issue is that how can an image be passed through the request header?
#need to setup security

app = Flask(__name__)
CORS(app)

new_model = load_model(os.path.join('models', 'eczemaclassifier.h5'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    img = cv2.imread(data['img'])
    resize = tf.image.resize(img, (256,256))
    yhat = new_model.predict(np.expand_dims(resize/255, 0))
    prediction = ''
    if yhat > 0.5:
        prediction = 'Predicted class is healthy'
    else:
        prediction = 'Predicted class is flared up'
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)