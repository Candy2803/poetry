// Header.js
import React from 'react';

const Header = ({ isLoggedIn, toggleMyPoems, isViewingMyPoems, handleLogout, openSignupModal, openLoginModal }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-purple-400 mb-6">Poetry Haven</h1>
      {!isLoggedIn ? (
        <div>
          <button className="bg-purple-600 p-2 rounded hover:bg-purple-700 mr-2" onClick={openSignupModal}>
            Sign Up
          </button>
          <button className="bg-purple-600 p-2 rounded hover:bg-purple-700" onClick={openLoginModal}>
            Log In
          </button>
        </div>
      ) : (
        <div>
          <button className="bg-purple-600 p-2 rounded hover:bg-purple-700 ml-2" onClick={toggleMyPoems}>
            {isViewingMyPoems ? 'View All Poems' : 'My Poems'}
          </button>
          <button className="bg-purple-600 p-2 rounded hover:bg-red-700 ml-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
