import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [poems, setPoems] = useState([]);
  const [myPoems, setMyPoems] = useState([]);
  const [isViewingMyPoems, setIsViewingMyPoems] = useState(false);

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPoems(); 
    }
  }, [isLoggedIn]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/poems');
      setPoems(response.data); 
      if (isViewingMyPoems && userId) {
        fetchUserPoems(); 
      }
    } catch (error) {
      console.error('Error fetching poems:', error);
    }
  };

  const fetchUserPoems = async () => {
    try {
      if (!userId) {
        console.error('UserId is not available');
        return;
      }
  
      console.log(`Fetching poems for user with ID: ${userId}`);
      const response = await axios.get(`http://localhost:5000/api/poems/user/${userId}`);
      
      console.log('User poems fetched:', response.data);
      setMyPoems(response.data);  
    } catch (error) {
      console.error('Error fetching user poems:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      alert('Signup successful!');
      setIsSignupOpen(false); 
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
  
      console.log('Login response:', response.data);
      
      setIsLoggedIn(true);
      setUserId(response.data.user_id); 
      alert('Login successful!');
      setIsLoginOpen(false);
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
        poet: username,
      });
      alert('Poem submitted successfully!');
      setTitle('');
      setContent('');
      fetchPoems(); 
    } catch (error) {
      console.error('Error submitting poem:', error);
    }
  };

  const handleDeletePoem = async (poemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/poems/${poemId}`, {
        data: { user_id: userId }, 
      });
      alert('Poem deleted successfully!');
      fetchPoems(); 
    } catch (error) {
      console.error('Error deleting poem:', error);
      alert('You are not authorized to delete this poem');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setIsViewingMyPoems(false);
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen text-lime-400 p-6">
      <video autoPlay muted loop className="absolute top-0 left-0 min-w-full min-h-full -z-10 bg-black">
        <source src="https://ik.imagekit.io/24rqula8cp/12146723_3840_2160_30fps.mp4?updatedAt=1728552794824" type="video/mp4" />
      </video>
      <div className="container mx-auto flex items-center justify-center h-screen">
        {!isLoggedIn ? (
          <div className="mb-6 flex flex-col items-center">
            <h1 className="text-5xl text-white mb-10 text-center font-extrabold">Poetry Haven</h1>
            <button
              className="bg-purple-600 text-2xl py-3 px-6 rounded hover:bg-purple-700 mb-4 w-64 cursor-pointer"
              onClick={() => setIsSignupOpen(true)}
            >
              Sign Up
            </button>
            <button
              className="bg-purple-600 text-2xl py-3 px-6 rounded hover:bg-purple-700 w-64 cursor-pointer"
              onClick={() => setIsLoginOpen(true)}
            >
              Log In
            </button>

            {isSignupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg relative">
                  <button
                    className="absolute top-0 right-0 m-2 text-white hover:text-gray-700"
                    onClick={() => setIsSignupOpen(false)}
                  >
                    X
                  </button>
                  <h2 className="text-2xl mb-4">Sign Up</h2>
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
                    className="bg-purple-600 p-2 rounded hover:bg-purple-700 mt-7"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {isLoginOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg relative">
                  <button
                    className="absolute top-0 right-0 m-2 text-white hover:text-gray-700"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    X
                  </button>
                  <h2 className="text-2xl mb-4">Log In</h2>
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
                    className="bg-purple-600 p-2 rounded hover:bg-purple-700 mt-7"
                    onClick={handleLogin}
                  >
                    Log In
                  </button>
                </div>
              </div>
            )}
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
              <h2 className="text-2xl mb-4">
                {isViewingMyPoems ? 'My Poems' : 'All Poems'}
              </h2>
              {isViewingMyPoems ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myPoems.length === 0 ? (
                    <p>No poems found.</p>
                  ) : (
                    myPoems.map((poem) => (
                      <li key={poem.id} className="bg-gray-800 p-4 rounded shadow-md">
                        <h3 className="text-xl mb-2">{poem.title}</h3>
                        <p className="mb-2">{poem.content}</p>
                        <button
                          className="bg-red-600 p-2 rounded hover:bg-red-700"
                          onClick={() => handleDeletePoem(poem.id)}
                        >
                          Delete Poem
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {poems.length === 0 ? (
                    <p>No poems found.</p>
                  ) : (
                    poems.map((poem) => (
                      <li key={poem.id} className="bg-gray-800 p-4 rounded shadow-md">
                        <h3 className="text-xl mb-2">{poem.title}</h3>
                        <p className="mb-2">{poem.content}</p>
                      </li>
                    ))
                  )}
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
