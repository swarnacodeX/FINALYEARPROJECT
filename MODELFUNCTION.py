# prompt: i want to input a single image and want to get the prediction using the aforementioned model and get the predicted chest diease

import os
import cv2
import numpy as np
from google.colab import files
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load your trained model
model = load_model('weights.weights.h5.keras') # Replace with your actual model file

# Function to preprocess the image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(256, 256))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.
    return img_array


# Upload the image
uploaded = files.upload()

for fn in uploaded.keys():
  # Preprocess the image
  img_path = fn
  img = preprocess_image(img_path)

  # Make the prediction
  prediction = model.predict(img)
  predicted_class = np.argmax(prediction)

  # Define a dictionary to translate labels
  label_names = {0: 'Covid-19', 1: 'Normal', 2: 'Viral Pneumonia', 3: 'Bacterial Pneumonia'}

  # Print the prediction
  print(f"The predicted chest disease for {fn} is: {label_names[predicted_class]}")
