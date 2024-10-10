// AuthModal.js
import React from 'react';

const AuthModal = ({ isOpen, onClose, isSignup, username, setUsername, password, setPassword, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg relative">
        <button
          className="absolute top-0 right-0 m-2 text-white hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
        <input
          type="text"
          className="p-2 border border-purple-500 rounded w-full mb-2 bg-gray-800 text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="p-2 border border-purple-500 rounded w-full bg-gray-800 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2 mt-7"
          onClick={handleSubmit}
        >
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
