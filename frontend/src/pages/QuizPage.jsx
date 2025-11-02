import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import QuizSelection from '../components/quiz/QuizSelection';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResult from '../components/quiz/QuizResult';
import QuizReview from '../components/quiz/QuizReview';
import { quizService } from '../services/quizService';

const QuizPage = () => {
  const { session } = useAuth();
  const [currentView, setCurrentView] = useState('selection');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userScores, setUserScores] = useState({});

  useEffect(() => {
    if (session?.user) {
      loadUserScores();
    }
  }, [session]);

  const loadUserScores = async () => {
    try {
      const scores = await quizService.getUserScores(session.user.id);
      setUserScores(scores);
    } catch (error) {
      console.error('Error loading user scores:', error);
    }
  };

  const handleQuizStart = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizData(quiz);
    setCurrentView('quiz');
  };

  const handleAnswerSubmit = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateAndSaveScore(newAnswers);
    }
  };

  const calculateAndSaveScore = async (finalAnswers) => {
    let score = 0;
    finalAnswers.forEach((answer, index) => {
      const question = quizData.questions[index];
      if (question.type === 'multiple-choice') {
        if (answer === question.correctAnswer) score++;
      } else if (question.type === 'drag-drop') {
        if (JSON.stringify(answer) === JSON.stringify(question.correctAnswer)) score++;
      }
    });

    // Save score to database
    try {
      await quizService.saveQuizScore(
        session.user.id,
        selectedQuiz.id,
        score,
        quizData.questions.length
      );

      // Reload scores
      await loadUserScores();
    } catch (error) {
      console.error('Error saving score:', error);
    }

    setCurrentView('result');
  };

  const handleReviewQuiz = () => {
    setCurrentView('review');
  };

  const handleRetryQuiz = () => {
    // Reset quiz state and restart the same quiz
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentView('quiz');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizData(null);
  };

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        {currentView === 'selection' && (
          <QuizSelection 
            onQuizStart={handleQuizStart}
            userScores={userScores}
          />
        )}
        
        {currentView === 'quiz' && quizData && (
          <QuizQuestion
            quiz={quizData}
            currentQuestion={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            totalQuestions={quizData.questions.length}
          />
        )}
        
        {currentView === 'result' && (
          <QuizResult
            quiz={selectedQuiz}
            answers={answers}
            onReviewQuiz={handleReviewQuiz}
            onBackToSelection={handleBackToSelection}
            onRetryQuiz={handleRetryQuiz}
            userScores={userScores}
          />
        )}
        
        {currentView === 'review' && (
          <QuizReview
            quiz={quizData}
            answers={answers}
            onBackToSelection={handleBackToSelection}
          />
        )}
      </div>
    </main>
  );
};

export default QuizPage;