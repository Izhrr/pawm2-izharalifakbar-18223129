import React, { useState, useEffect } from 'react';

const QuizQuestion = ({ quiz, currentQuestion, onAnswerSubmit, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [dragItems, setDragItems] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const question = quiz.questions[currentQuestion];
  
  useEffect(() => {
    setSelectedAnswer('');
    if (question.type === 'drag-drop') {
      // Shuffle options for drag and drop
      const shuffled = [...question.options].sort(() => Math.random() - 0.5);
      setDragItems(shuffled.map((item, index) => ({ id: `item-${index}`, content: item })));
    }
  }, [currentQuestion, question]);

  const handleMultipleChoice = (answer) => {
    setSelectedAnswer(answer);
  };

  // Native drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...dragItems];
    const draggedItem = newItems[draggedIndex];
    
    // Remove dragged item
    newItems.splice(draggedIndex, 1);
    // Insert at new position
    newItems.splice(dropIndex, 0, draggedItem);
    
    setDragItems(newItems);
    setSelectedAnswer(newItems.map(item => item.content));
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Alternative: Click to reorder (for better mobile support)
  const moveItemUp = (index) => {
    if (index === 0) return;
    const newItems = [...dragItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setDragItems(newItems);
    setSelectedAnswer(newItems.map(item => item.content));
  };

  const moveItemDown = (index) => {
    if (index === dragItems.length - 1) return;
    const newItems = [...dragItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setDragItems(newItems);
    setSelectedAnswer(newItems.map(item => item.content));
  };

  const handleSubmit = () => {
    if (question.type === 'multiple-choice' && selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    } else if (question.type === 'drag-drop' && dragItems.length > 0) {
      onAnswerSubmit(dragItems.map(item => item.content));
    }
  };

  const canSubmit = () => {
    if (question.type === 'multiple-choice') {
      return selectedAnswer !== '';
    }
    return dragItems.length > 0;
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {totalQuestions}</span>
          <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Drag & Drop'}
            </span>
            <span className="text-gray-400 text-sm">{quiz.title}</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-6">{question.question}</h2>
        </div>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && (
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleChoice(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                    : 'border-gray-600 bg-gray-700 text-gray-100 hover:border-gray-500 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Drag and Drop */}
        {question.type === 'drag-drop' && (
          <div className="mb-8">
            <p className="text-gray-300 mb-4">
              Drag the items to arrange them in the correct order (or use arrow buttons):
            </p>
            <div className="space-y-3">
              {dragItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 rounded-lg border-2 cursor-move transition-all duration-200 ${
                    draggedIndex === index
                      ? 'border-emerald-400 bg-emerald-400/10 shadow-lg transform scale-105'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-gray-300 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-100 flex-1">{item.content}</span>
                    
                    {/* Control Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItemUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded ${
                          index === 0 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-600'
                        }`}
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveItemDown(index)}
                        disabled={index === dragItems.length - 1}
                        className={`p-1 rounded ${
                          index === dragItems.length - 1 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-600'
                        }`}
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Drag Handle */}
                    <div className="w-6 h-6 text-gray-400 cursor-move">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Instructions */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tip: You can drag items or use the arrow buttons to reorder them
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              canSubmit()
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;