import React from 'react';

const Sidebar = ({ topics, activeTopic, setActiveTopic }) => {
  return (
    <aside className="fixed left-0 top-28 w-70 h-screen px-8 overflow-y-auto bg-gray-900 border-r border-gray-600">
      <h3 className="text-gray-100 mb-4 pb-2 border-b border-gray-600">SQL Tutorial</h3>
      <ul className="list-none">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              onClick={() => !topic.disabled && setActiveTopic(topic.id)}
              className={`block w-full text-left px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                topic.disabled
                  ? 'text-gray-600 cursor-not-allowed'
                  : activeTopic === topic.id
                  ? 'bg-emerald-500 text-gray-900 font-semibold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
              }`}
              disabled={topic.disabled}
            >
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;