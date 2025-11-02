import React, { useState } from 'react';

const MultipleChoiceExercise = ({ options, exerciseId, correctFeedback, incorrectFeedback }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const checkAnswer = () => {
    if (!selectedValue) {
      setFeedback("Please select an answer.");
      setStatus('warning');
      return;
    }

    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption?.correct) {
      setFeedback(correctFeedback);
      setStatus('correct');
    } else {
      setFeedback(incorrectFeedback);
      setStatus('wrong');
    }
  };

  return (
    <div className="border border-gray-600 rounded-lg p-6 my-8">
      <div className="flex flex-col gap-4 mb-4">
        {options.map((option) => (
          <label key={option.value} className="bg-white/5 border border-gray-600 p-4 rounded-lg cursor-pointer flex items-center gap-4 hover:border-[#0059FF] transition-colors">
            <input
              type="radio"
              name={exerciseId}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer relative checked:border-[#0059FF] checked:after:content-[''] checked:after:block checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[#0059FF] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      <button onClick={checkAnswer} className="bg-transparent border border-gray-100 text-gray-100 px-6 py-2 rounded-md font-semibold hover:border-[#0059FF] hover:bg-[#0059FF] hover:[#0059FF] hover:text-white transition-all">
        Check Answer
      </button>

      {feedback && (
        <p className={`mt-2 font-semibold ${
          status === 'correct' ? 'text-emerald-500' : 
          status === 'wrong' ? 'text-red-400' : 'text-orange-400'
        }`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default MultipleChoiceExercise;