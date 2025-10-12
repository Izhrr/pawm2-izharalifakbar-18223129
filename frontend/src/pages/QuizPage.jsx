import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import QuizSelection from '../components/quiz/QuizSelection';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResult from '../components/quiz/QuizResult';
import QuizReview from '../components/quiz/QuizReview';
import { supabase } from '../lib/supabaseClient';

const QuizPage = () => {
  const { session } = useAuth();
  const [currentView, setCurrentView] = useState('selection'); // selection, quiz, result, review
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userScores, setUserScores] = useState({});
  const [quizData, setQuizData] = useState(null);

  // Load user scores from database
  useEffect(() => {
    if (session?.user?.id) {
      loadUserScores();
    }
  }, [session]);

  const loadUserScores = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_scores')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      
      const scoresMap = {};
      data.forEach(score => {
        scoresMap[score.quiz_id] = {
          highest_score: score.highest_score,
          total_questions: score.total_questions,
          completed_at: score.completed_at
        };
      });
      
      setUserScores(scoresMap);
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
      // Quiz completed, calculate score and save
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
      console.log('Saving score:', score, 'for quiz:', selectedQuiz.id, 'user:', session.user.id);
      
      // First, check if record exists
      const { data: existingScore, error: fetchError } = await supabase
        .from('quiz_scores')
        .select('highest_score, id')
        .eq('user_id', session.user.id)
        .eq('quiz_id', selectedQuiz.id)
        .maybeSingle(); 

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      const shouldUpdate = !existingScore || score > existingScore.highest_score;
      const finalScore = shouldUpdate ? score : existingScore?.highest_score || score;

      console.log('Existing score:', existingScore?.highest_score, 'New score:', score, 'Should update:', shouldUpdate);

      if (existingScore) {
        // Record exists, update if new score is higher
        if (shouldUpdate) {
          const { error: updateError } = await supabase
            .from('quiz_scores')
            .update({
              highest_score: score,
              total_questions: quizData.questions.length,
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', existingScore.id);

          if (updateError) throw updateError;
          console.log('Score updated successfully');
        } else {
          console.log('New score is not higher, keeping existing score');
        }
      } else {
        // Record doesn't exist, insert new one
        const { error: insertError } = await supabase
          .from('quiz_scores')
          .insert({
            user_id: session.user.id,
            quiz_id: selectedQuiz.id,
            highest_score: score,
            total_questions: quizData.questions.length,
            completed_at: new Date().toISOString()
          });

        if (insertError) throw insertError;
        console.log('New score inserted successfully');
      }

      // Update local scores state
      setUserScores(prev => ({
        ...prev,
        [selectedQuiz.id]: {
          highest_score: finalScore,
          total_questions: quizData.questions.length,
          completed_at: new Date().toISOString()
        }
      }));

      setCurrentView('result');
    } catch (error) {
      console.error('Error saving score:', error);
      // Still show result even if save fails
      setCurrentView('result');
    }
  };

  const handleReviewQuiz = () => {
    setCurrentView('review');
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