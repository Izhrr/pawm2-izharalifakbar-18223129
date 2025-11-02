import React, { useState } from 'react';

const DragDropExercise = ({ query, answer, endQuery, options, exerciseId }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedValue, setDroppedValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState(''); 
  const handleDragStart = (e, value) => {
    setDraggedItem(value);
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = (e) => {
    setTimeout(() => {
      e.target.style.display = 'inline-block';
      setDraggedItem(null);
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedValue(draggedItem);
      setFeedback('');
      setStatus('');
    }
  };

  const checkAnswer = () => {
    if (!droppedValue) {
      setFeedback("Please drop an operator into the box.");
      setStatus('warning');
      return;
    }

    if (droppedValue === answer) {
      setFeedback("Correct! Well done.");
      setStatus('correct');
    } else {
      setFeedback(`Not quite. '${droppedValue}' is not the right operator here. Try again!`);
      setStatus('wrong');
    }
  };

  return (
    <div className="border border-gray-600 rounded-lg p-6 my-8">
      <div className="font-mono text-lg flex items-center gap-2 flex-wrap mb-4">
        <span className="text-purple-300 font-semibold">SELECT</span>
        <span>{query.replace('SELECT ', '')}</span>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`inline-block w-20 h-9 border-2 border-dashed rounded-md text-center leading-7 font-semibold transition-all ${
            status === 'correct'
              ? 'bg-emerald-500/30 border-emerald-500 text-emerald-400'
              : status === 'wrong'
              ? 'bg-red-500/30 border-red-500 text-red-400'
              : 'bg-white/10 border-gray-400 hover:border-emerald-400 hover:bg-emerald-400/20'
          }`}
        >
          {droppedValue}
        </div>
        <span>{endQuery}</span>
      </div>
      
      <div className="flex gap-4 mb-4">
        {options.map((option) => (
          <div
            key={option}
            draggable
            onDragStart={(e) => handleDragStart(e, option)}
            onDragEnd={handleDragEnd}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md cursor-grab font-mono font-semibold hover:bg-gray-700"
          >
            {option}
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} className="bg-transparent border border-gray-100 text-gray-100 px-6 py-2 rounded-md font-semibold hover:bg-emerald-400 hover:border-emerald-400 hover:text-white transition-all">
        Check Answer
      </button>

      {feedback && (
        <p className={`mt-2 font-semibold ${
          status === 'correct' ? 'text-emerald-400' : 
          status === 'wrong' ? 'text-red-400' : 'text-orange-400'
        }`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default DragDropExercise;