import React, { useState } from 'react';
import PoemCard from './PoemCard';

const PoemForm = () => {
  const [poemData, setPoemData] = useState({ title: '', content: '' });
  const [poems, setPoems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoemData({ ...poemData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Keep the line breaks intact
    const formattedContent = poemData.content
      .replace(/\r?\n/g, '\n'); // Ensure all newlines are kept
  
    const newPoem = { ...poemData, content: formattedContent, id: Date.now() }; 
    setPoems([...poems, newPoem]);
    setPoemData({ title: '', content: '' });
  };
  

  const handleDelete = (id) => {
    setPoems(poems.filter(poem => poem.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-purple-800 p-8 rounded-lg shadow-lg mb-4">
        <h2 className="text-purple-200 text-3xl mb-4">Welcome</h2>
        <div className="mb-4">
          <label className="block text-purple-200">Title</label>
          <input
            name="title"
            type="text"
            value={poemData.title}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-purple-900 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-200">Content</label>
          <textarea
            name="content"
            value={poemData.content}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-purple-900 text-white h-56"
            required
          ></textarea>
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
          Submit
        </button>
      </form>

      <div className="w-full max-w-md">
        {poems.map((poem) => (
          <PoemCard key={poem.id} poem={poem} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PoemForm;
