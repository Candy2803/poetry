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
  const [isPoemModalOpen, setIsPoemModalOpen] = useState(false); // State for poem modal

  useEffect(() => {
    if (isLoggedIn) {
      fetchPoems(); 
    }
  }, [isLoggedIn]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get('https://poetry-3.onrender.com/api/poems');
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
      const response = await axios.get(`https://poetry-3.onrender.com/api/poems/user/${userId}`);
      
      console.log('User poems fetched:', response.data);
      setMyPoems(response.data);  
    } catch (error) {
      console.error('Error fetching user poems:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://poetry-3.onrender.com/api/register', {
        username,
        password,
      });
  
      alert('Signup successful!');
      setIsSignupOpen(false); 
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Signup failed. Please try again.'}`);
      } else if (error.request) {
        alert('No response from server. Please check your network.');
      } else {
        alert('Something went wrong.');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://poetry-3.onrender.com/api/login', {
        username,
        password,
      });
  
      setIsLoggedIn(true);
      setUserId(response.data.user_id); 
      alert('Login successful!');
      setIsLoginOpen(false);
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleSubmitPoem = async () => {
    try {
      await axios.post('https://poetry-3.onrender.com/api/poems', {
        title,
        content,
        user_id: userId,
        poet: username,
      });
      alert('Poem submitted successfully!');
      setTitle('');
      setContent('');
      setIsPoemModalOpen(false); // Close the modal after submission
      fetchPoems(); 
    } catch (error) {
      console.error('Error submitting poem:', error);
    }
  };

  const handleDeletePoem = async (poemId) => {
    try {
      await axios.delete(`https://poetry-3.onrender.com/api/poems/${poemId}`, {
        data: { user_id: userId },
      });
      alert('Poem deleted successfully!');
      fetchPoems(); 
    } catch (error) {
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
    <div className=" min-h-screen text-lime-400 p-6">
      <video autoPlay muted loop className="absolute top-0 left-0 min-w-full min-h-full -z-10 bg-black">
        <source src="https://ik.imagekit.io/24rqula8cp/12146723_3840_2160_30fps.mp4?updatedAt=1728552794824" type="video/mp4"/>
      </video>
      <div className="container mx-auto">

        {!isLoggedIn ? (
          <div className="mb-6">
            <div className="mb-6 flex flex-col justify-center items-center h-screen">
              <h1 className="text-7xl text-white mb-6 text-center font-extrabold">Poetry Haven</h1>

              <button
                className="bg-purple-600 p-6 text-3xl rounded-xl hover:bg-purple-700 mr-6"
                onClick={() => setIsSignupOpen(true)}
              >
                Sign Up
              </button>
              <button
                className="bg-purple-600 p-6 text-3xl rounded-xl hover:bg-purple-700 mt-12 mr-5"
                onClick={() => setIsLoginOpen(true)}
              >
                Log In
              </button>
            </div>

            {/* Signup Modal */}
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
                    className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2 mt-7"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* Login Modal */}
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
                    className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2 mt-7"
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
              <h1 className="text-7xl text-white mb-6 text-center font-extrabold">Poetry Haven</h1>
              <div className="flex justify-between">
              <button
              className="bg-purple-600 p-2 rounded hover:bg-purple-700 text-3xl font-bold"
              onClick={() => setIsPoemModalOpen(true)} // Open the poem modal
            >
              New Poem
            </button>
            <button
              className="bg-purple-600 p-2 rounded hover:bg-red-700 ml-2 text-3xl font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
            </div>
            <div className="mt-6">
    <h2 className="text-2xl mb-4">All Poems</h2>
    {poems.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {poems.map((poem) => (
          <div key={poem.id} className="bg-gray-700 p-4 rounded shadow-lg">
            <h3 className="text-xl font-bold text-purple-500">{poem.title}</h3>
            <p className="text-sm text-gray-400">By: {poem.poet}</p>
            <pre className="text-purple-300 whitespace-pre-wrap break-words mt-2 flex-grow">
      {poem.content}
    </pre>
            
            {poem.user_id === userId && (
              <button
              className="bg-blue-600 p-2 rounded hover:bg-gray-500 mt-2"
              onClick={() => handleDeletePoem(poem.id)}
            >
              Delete Poem
            </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-white">No poems available.</p>
    )}
  </div>

            {/* Poem Modal */}
            {isPoemModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg relative">
                  <button
                    className="absolute top-0 right-0 m-2 text-white hover:text-gray-700"
                    onClick={() => setIsPoemModalOpen(false)} // Close modal
                  >
                    X
                  </button>
                  <h2 className="text-2xl mb-4">Write a Poem</h2>
                  <input
                    type="text"
                    className="p-2 border border-purple-500 rounded w-full mb-2 bg-gray-800 text-white"
                    placeholder="Poem Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="p-2 border border-purple-500 rounded w-full mb-2 bg-gray-800 text-white"
                    placeholder="Poem Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button
                    className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2 mt-7"
                    onClick={handleSubmitPoem}
                  >
                    Submit Poem
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
