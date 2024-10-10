// PoemForm.js
import React from 'react';

const PoemForm = ({ title, setTitle, content, setContent, handleSubmitPoem }) => {
  return (
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
    </div>
  );
};

export default PoemForm;
