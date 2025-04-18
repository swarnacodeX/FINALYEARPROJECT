import React from 'react'
import Navbar from '../utils/Navbar';
 const ChatBot = () => {
  return (
<>
  <div>
        <Navbar/></div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-3/4">
                <h2 className="text-xl font-semibold mb-4">Chatbot</h2>
                <div className="mb-3">
                    <input type="file" placeholder="ATTACH CHEST XRAY IMAGE" className="border border-gray-300 rounded-lg p-2 w-full" />
                </div>
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">Send</button>
            </div>

        
    </div>
    </>
  )
}
export default ChatBot;
