import React from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Eye } from 'lucide-react';

const QuizResult = ({ quiz, answers, onReviewQuiz, onBackToSelection, userScores }) => {
  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      const question = quiz.questions[index];
      if (question.type === 'multiple-choice') {
        if (answer === question.correctAnswer) correct++;
      } else if (question.type === 'drag-drop') {
        if (JSON.stringify(answer) === JSON.stringify(question.correctAnswer)) correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const isAllCorrect = score === total;
  const previousBest = userScores[quiz.id]?.highest_score || 0;
  const isNewRecord = score > previousBest;

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (isAllCorrect) return "Perfect! You've mastered this topic! 🎉";
    if (percentage >= 80) return "Excellent work! You're doing great! 👏";
    if (percentage >= 60) return "Good job! Keep practicing to improve! 💪";
    return "Don't give up! Review the material and try again! 📚";
  };

  return (
    <div className="mx-auto">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-8 text-center">


        {/* Score Display */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-6">Quiz Complete!</h1>
          
          {/* New Record Badge */}
          {isNewRecord && (
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              New Personal Best!
            </div>
          )}

          {/* Completion Status */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            isAllCorrect 
              ? 'bg-emerald-400/20 text-emerald-400' 
              : 'bg-yellow-400/20 text-yellow-400'
          }`}>
            {isAllCorrect ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                {score}/{total} Correct
              </>
            )}
          </div>
        </div>

        {/* Score Message */}
        <p className="text-lg text-gray-300 mb-8">
          {getScoreMessage()}
        </p>

        {/* Previous Best Score */}
        {previousBest > 0 && (
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-400 mb-1">Previous Best Score</div>
            <div className="text-lg font-semibold text-gray-100">{previousBest}/{total}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReviewQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            Review Answers
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Quiz
          </button>
          
          <button
            onClick={onBackToSelection}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-100 font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;