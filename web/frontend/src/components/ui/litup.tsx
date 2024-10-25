import React from 'react';

interface LitUpButtonProps {
  text: string;
  onClick?: () => void;
}

const LitUpButton: React.FC<LitUpButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="relative overflow-hidden px-6 py-3 font-medium text-white bg-gray-800 border-2 border-transparent transition-all duration-300 hover:border-yellow-400 hover:bg-black rounded-md" // Added rounded-md class
      onClick={onClick}
    >
      <span className="absolute inset-0 bg-yellow-400 w-full h-0 transition-all duration-300 hover:h-full z-0 rounded-md"></span> {/* Ensure inner span also has rounded corners */}
      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default LitUpButton;
