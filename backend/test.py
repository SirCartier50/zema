from tensorflow.keras.models import load_model
import os
import tensorflow as tf
import numpy as np
import json
import cv2
import imghdr
from matplotlib import pyplot as plt

new_model = load_model(os.path.join('models', 'eczemaclassifier.h5'))
img = cv2.imread('C378NKSK_1401_C_1389.jpeg')

#resize image first
resize = tf.image.resize(img, (256,256))
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.show()
yhat = new_model.predict(np.expand_dims(resize/255, 0))

if yhat > 0.5:
  print(f'Predicted class is Sad')
else:
  print(f'Predicted class is Happy')