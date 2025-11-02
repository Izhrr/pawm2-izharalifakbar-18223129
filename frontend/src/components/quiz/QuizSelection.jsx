import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { CheckCircle, Clock, Star } from 'lucide-react';
import { quizService } from '../../services/quizService';

const QuizSelection = ({ onQuizStart, userScores }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizService.getAllQuizzes();
      setQuizzes(data.map(q => ({
        id: q.quiz_id,
        title: q.title,
        description: q.description,
        difficulty: q.difficulty,
        estimatedTime: q.estimated_time,
        questions: q.questions
      })));
    } catch (err) {
      console.error('Error loading quizzes:', err);
      setError('Failed to load quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-xl text-gray-400">Loading quizzes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Quiz</h1>
        <p className="text-gray-300 text-lg">
          Select a quiz below to test your SQL knowledge and track your progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const scoreStatus = userScores[quiz.id];
          
          return (
            <div
              key={quiz.id}
              className="bg-gray-800 border border-gray-600 rounded-2xl p-6 hover:border-[#0059FF] transition-all duration-200"
            >
              {scoreStatus && (
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Best: {scoreStatus.highest_score}/{scoreStatus.total_questions}
                  </span>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {quiz.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    {quiz.estimatedTime}
                  </div>
                </div>
                
                <Button
                  onClick={() => onQuizStart(quiz)}
                  className="w-full py-3 px-4 rounded-lg"
                >
                  {scoreStatus ? 'Retry Quiz' : 'Start Quiz'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSelection;