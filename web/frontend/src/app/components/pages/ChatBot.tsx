import React, { useState } from 'react';
import Navbar from '../utils/Navbar';
import medai from '../../../../public/WELCOME.png'; // Import the image

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
    formData.append('image', selectedImage);

    try {
      const response = await fetch('https://6d35-35-245-148-166.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
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
          <h2 className="text-2xl font-bold mb-4 text-center">Chatbot</h2>
          <div className="mb-3">
            <input
              type="file"
              className="border border-gray-300 rounded-lg p-2 w-full"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 w-full"
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
    </div>
  );
};

export default ChatBot;
