import React from 'react';
import Button from '../Button';
import Eye from 'lucide-react/dist/esm/icons/eye';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import checkCircle from '../../assets/check_circle.png';

const QuizResult = ({ quiz, answers, onReviewQuiz, onBackToSelection, userScores, onRetryQuiz }) => {
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
  const previousBest = userScores[quiz.id]?.highest_score || 0;

  return (
    <div className="mx-auto">
      <div className="bg-[#0A1121] rounded-[2rem] p-8 sm:p-12 text-center mx-auto border border-[#1A2340] shadow-lg relative">
        {/* Check Circle Image */}
        <div className="flex justify-center mb-6">
          <img src={checkCircle} alt="Quiz Complete" className="w-24 h-24 rounded-full bg-[#10182F] p-4" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Quiz Complete!</h1>
        <p className="text-gray-300 text-lg mb-4">Don't give up! Review the material and try again! <span role="img" aria-label="books">📚</span></p>
        {/* Score */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-yellow-400 text-xl"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg></span>
          <span className="text-yellow-400 text-lg font-medium">{score}/{total} Correct</span>
        </div>
        {/* Previous Best Score */}
        <div className="bg-[#10182F] rounded-2xl py-6 px-4 mb-8">
          <div className="text-gray-400 text-base mb-1">Previous Best Score</div>
          <div className="text-white text-xl font-semibold">{previousBest}/{total}</div>
        </div>
        {/* Retry Button */}
        <div className="mb-4">
          <Button className="w-full text-lg py-3 rounded-2xl" onClick={onRetryQuiz}>
            Retry Quiz
          </Button>
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="flex-1 bg-[#10182F] border border-[#1A2340] text-[#B6C2E2] hover:bg-[#10182F] hover:text-white text-base py-3 rounded-2xl"
            style={{background: '#10182F'}}
            onClick={onBackToSelection}
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Quizzes
          </Button>
          <Button
            className="flex-1 bg-[#10182F] border border-[#1A2340] text-[#B6C2E2] hover:bg-[#10182F] hover:text-white text-base py-3 rounded-2xl"
            style={{background: '#10182F'}}
            onClick={onReviewQuiz}
          >
            <Eye className="w-5 h-5 mr-2" /> Review Anwers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;