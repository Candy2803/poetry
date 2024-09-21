import React, { useState } from 'react';

const Login = () => {
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
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-purple-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-purple-200 text-3xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-purple-200">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-purple-900 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-200">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-purple-900 text-white"
            required
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
