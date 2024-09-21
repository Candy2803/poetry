import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/poems');
      setPoems(response.data);
    } catch (error) {
      console.error('Error fetching poems:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      alert('Signup successful!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setIsLoggedIn(true);
      setUserId(response.data.user_id);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  const handleSubmitPoem = async () => {
    try {
      await axios.post('http://localhost:5000/api/poems', {
        title,
        content,
        user_id: userId,
        poet: username, // Include the poet's name
      });
      alert('Poem submitted successfully!');
      setTitle('');
      setContent('');
      fetchPoems(); // Refresh the list of poems
    } catch (error) {
      console.error('Error submitting poem:', error);
    }
  };
  
  

  const handleDeletePoem = async (poemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/poems/${poemId}`);
      alert('Poem deleted successfully!');
      fetchPoems(); // Refresh the poem list
    } catch (error) {
      console.error('Error deleting poem:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    alert('Logged out successfully!');
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl text-purple-400 mb-6">Poetry Website</h1>

        {!isLoggedIn ? (
          <div className="mb-6">
            <h2 className="text-2xl mb-4">Sign Up / Log In</h2>
            <div className="mb-4">
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
            </div>
            <button
              className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <button
              className="bg-purple-600 p-2 rounded hover:bg-purple-700"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Write a Poem</h2>
            <input
              type="text"
              className="p-2 border border-purple-500 rounded w-full mb-2 bg-gray-800 text-white"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="p-2 border border-purple-500 rounded w-full mb-4 bg-gray-800 text-white"
              placeholder="Poem Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="bg-purple-600 p-2 rounded hover:bg-purple-700"
              onClick={handleSubmitPoem}
            >
              Submit Poem
            </button>
            <button
              className="bg-purple-600 p-2 rounded hover:bg-red-700 ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>

            <div className="mt-8">
  <h2 className="text-2xl mb-4">All Poems</h2>
  {poems.length === 0 ? (
    <p>No poems yet.</p>
  ) : (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {poems.map((poem) => (
    <li key={poem.id} className="bg-gray-900 rounded p-4 shadow-lg flex flex-col">
      <h3 className="text-lg font-semibold text-purple-400">{poem.title}</h3>
      <p className="text-purple-300 italic">By: {poem.poet}</p> {/* Display poet's name */}
      <pre className="text-purple-300 whitespace-pre-wrap break-words mt-2 flex-grow">
        {poem.content}
      </pre>
      <button
        onClick={() => handleDeletePoem(poem.id)}
        className="mt-2 bg-purple-600 text-white py-1 px-3 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  ))}
</ul>

  )}
</div>


          </div>
        )}
      </div>
    </div>
  );
}

export default App;
