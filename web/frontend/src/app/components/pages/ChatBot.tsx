import React, { useState } from 'react';
import Navbar from '../utils/Navbar';
import medai from '../../../../public/WELCOME.png'; // Import the image
import axios from 'axios';
const ChatBot = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // File type for selected image
  const [prediction, setPrediction] = useState<string | null>(null); // Prediction result

  // Correcting the type of the event parameter
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
  if (!selectedImage) {
    alert('Please select an image');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedImage); // key must be 'image' to match Flask API

  try {
    const response = await axios.post(
      'https://8333-34-138-25-129.ngrok-free.app/predict',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = response.data;
    if (response.status === 200) {
      setPrediction(data.prediction); // Set the prediction result
    } else {
      alert(data.error || 'Error during prediction');
    }
  } catch (error) {
    console.error('Error during request:', error);
    alert('Error during request');
  }
};


  return (
    <div className="h-screen w-full">
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 w-3/4 max-w-xl">
          <img
            src={medai.src}
            alt="Welcome"
            className="absolute top-4 left-4 w-64 h-32" // Adjust size as needed
          />
          <h2 className="text-2xl font-bold mb-4 text-center">AI:Chest Disease Detection System</h2>
          <div className="mb-3">
            <input
              type="file"
              className="border border-gray-300 rounded-lg p-2 w-full"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-black hover:bg-stone-700 text-white rounded-lg px-4 py-2 w-full"
            onClick={handleSubmit}
          >
            Send
          </button>
          
          {/* Display the prediction result */}
          {prediction && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">Prediction: {prediction}</h3>
            </div>
          )}
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center absolute bottom-0 w-full">
        <p>&copy; MED-AI's AI prediction system analyzes chest X-ray images to assist in identifying potential chest diseases. The results provided are for informational purposes only and do not constitute a medical diagnosis. For further assistance or to discuss your results, please contact a qualified healthcare professional. If you experience urgent symptoms, seek immediate medical attention.</p>
      </footer>
    </div>
  );
};

export default ChatBot;
