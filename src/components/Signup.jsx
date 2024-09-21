import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call)
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-900 to-black">
      <form onSubmit={handleSubmit} className="bg-black bg-opacity-75 p-10 rounded-lg shadow-xl border border-purple-600">
        <h2 className="text-purple-300 text-4xl mb-6 text-center">Create an Account</h2>
        <div className="mb-6">
          <label className="block text-purple-300 text-lg mb-2">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-purple-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-purple-300 text-lg mb-2">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-purple-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="w-full bg-purple-500 text-white py-2 rounded-md transition duration-300 hover:bg-purple-600 transform hover:scale-105">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
