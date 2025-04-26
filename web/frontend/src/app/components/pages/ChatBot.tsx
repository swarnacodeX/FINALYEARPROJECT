import React from 'react';
import Navbar from '../utils/Navbar';

const ChatBot = () => {
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
          <h2 className="text-2xl font-bold mb-4 text-center">Chatbot</h2>
          <div className="mb-3">
            <input
              type="file"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 w-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
