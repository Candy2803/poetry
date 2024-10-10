// PoemList.js
import React from 'react';

const PoemList = ({ poems, isViewingMyPoems }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">
        {isViewingMyPoems ? 'My Poems' : 'All Poems'}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.length === 0 ? (
          <p>{isViewingMyPoems ? 'No poems found.' : 'No poems yet.'}</p>
        ) : (
          poems.map((poem) => (
            <li key={poem.id} className="bg-gray-900 rounded p-4 shadow-lg flex flex-col">
              <h3 className="text-lg font-semibold text-purple-400">{poem.title}</h3>
              <p className="text-purple-300 italic">By: {poem.poet}</p>
              <pre className="text-purple-300 whitespace-pre-wrap break-words mt-2 flex-grow">
                {poem.content}
              </pre>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PoemList;
