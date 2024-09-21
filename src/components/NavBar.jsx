import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-black p-4">
      <ul className="flex justify-between text-purple-400 text-lg">
        <li><a href="/">Home</a></li>
        <li><a href="/write-poem">Write Poem</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
