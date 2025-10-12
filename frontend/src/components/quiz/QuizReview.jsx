import React from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const QuizReview = ({ quiz, answers, onBackToSelection }) => {
  const isCorrectAnswer = (questionIndex, userAnswer) => {
    const question = quiz.questions[questionIndex];
    if (question.type === 'multiple-choice') {
      return userAnswer === question.correctAnswer;
    } else if (question.type === 'drag-drop') {
      return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
    }
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBackToSelection}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-100 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Quizzes
        </button>
        <h1 className="text-3xl font-bold mb-2">Quiz Review</h1>
        <p className="text-gray-300">{quiz.title} - Answer Review</p>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        {quiz.questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = isCorrectAnswer(index, userAnswer);

          return (
            <div
              key={question.id}
              className={`bg-gray-800 border-2 rounded-lg p-6 ${
                isCorrect ? 'border-emerald-400/50' : 'border-red-400/50'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Question {index + 1}
                    </span>
                    <span className={`flex items-center gap-2 text-sm font-semibold ${
                      isCorrect ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Incorrect
                        </>
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{question.question}</h3>
                </div>
              </div>

              {/* Multiple Choice Review */}
              {question.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = userAnswer === option;
                    const isCorrectOption = option === question.correctAnswer;
                    
                    let optionStyle = 'border-gray-600 bg-gray-700 text-gray-100';
                    if (isCorrectOption) {
                      optionStyle = 'border-emerald-400 bg-emerald-400/10 text-emerald-400';
                    } else if (isUserAnswer && !isCorrectOption) {
                      optionStyle = 'border-red-400 bg-red-400/10 text-red-400';
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-lg border-2 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current text-sm font-medium">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          {option}
                          {isCorrectOption && (
                            <CheckCircle className="w-5 h-5 ml-auto" />
                          )}
                          {isUserAnswer && !isCorrectOption && (
                            <XCircle className="w-5 h-5 ml-auto" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Drag and Drop Review */}
              {question.type === 'drag-drop' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Your Answer:</h4>
                    <div className="space-y-2">
                      {userAnswer?.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 rounded-lg bg-gray-700 border border-gray-600">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-600 text-gray-300 text-sm">
                              {itemIndex + 1}
                            </span>
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2">Correct Answer:</h4>
                    <div className="space-y-2">
                      {question.correctAnswer.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 rounded-lg bg-emerald-400/10 border border-emerald-400">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-400 text-gray-900 text-sm">
                              {itemIndex + 1}
                            </span>
                            <span className="text-emerald-400">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBackToSelection}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Back to Quiz Selection
        </button>
      </div>
    </div>
  );
};

export default QuizReview;