import React from 'react';
import Button from '../Button';
import { CheckCircle, Clock, Star } from 'lucide-react';

const QuizSelection = ({ onQuizStart, userScores }) => {
  const quizzes = [
    {
      id: 'basic-sql',
      title: 'Basic SQL Commands',
      description: 'Test your knowledge of fundamental SQL operations like SELECT, INSERT, UPDATE, and DELETE.',
      difficulty: 'Easy',
      estimatedTime: '5 minutes',
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Which SQL statement is used to extract data from a database?',
          options: ['GET', 'SELECT', 'EXTRACT', 'PULL'],
          correctAnswer: 'SELECT'
        },
        {
          id: 2,
          type: 'multiple-choice', 
          question: 'What does the WHERE clause do in SQL?',
          options: ['Sorts the results', 'Filters records', 'Groups data', 'Joins tables'],
          correctAnswer: 'Filters records'
        },
        {
          id: 3,
          type: 'drag-drop',
          question: 'Arrange the correct order for a basic SELECT statement:',
          options: ['FROM table_name', 'SELECT column_name', 'WHERE condition'],
          correctAnswer: ['SELECT column_name', 'FROM table_name', 'WHERE condition']
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: 'Which SQL command is used to add new records to a table?',
          options: ['ADD', 'INSERT', 'CREATE', 'UPDATE'],
          correctAnswer: 'INSERT'
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: 'What symbol is used as a wildcard to select all columns?',
          options: ['%', '*', '#', '@'],
          correctAnswer: '*'
        }
      ]
    },
    {
      id: 'joins-relations',
      title: 'JOINs and Relations', 
      description: 'Master different types of JOINs and understand relationships between tables.',
      difficulty: 'Medium',
      estimatedTime: '7 minutes',
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Which JOIN returns all records from both tables?',
          options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
          correctAnswer: 'FULL OUTER JOIN'
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'What does INNER JOIN do?',
          options: [
            'Returns all records from left table',
            'Returns all records from right table', 
            'Returns only matching records from both tables',
            'Returns all records from both tables'
          ],
          correctAnswer: 'Returns only matching records from both tables'
        },
        {
          id: 3,
          type: 'drag-drop',
          question: 'Complete the JOIN syntax:',
          options: ['ON table1.id = table2.id', 'SELECT *', 'FROM table1', 'INNER JOIN table2'],
          correctAnswer: ['SELECT *', 'FROM table1', 'INNER JOIN table2', 'ON table1.id = table2.id']
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: 'LEFT JOIN returns:',
          options: [
            'Only matching records',
            'All records from left table and matching from right',
            'All records from right table and matching from left',
            'No records if no match'
          ],
          correctAnswer: 'All records from left table and matching from right'
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: 'Which keyword is used to combine results from multiple SELECT statements?',
          options: ['UNION', 'JOIN', 'MERGE', 'COMBINE'],
          correctAnswer: 'UNION'
        }
      ]
    },
    {
      id: 'advanced-queries',
      title: 'Advanced Queries',
      description: 'Challenge yourself with complex queries, subqueries, and advanced SQL functions.',
      difficulty: 'Hard',
      estimatedTime: '10 minutes',
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Which function is used to get the current date in SQL?',
          options: ['NOW()', 'CURRENT_DATE()', 'TODAY()', 'GETDATE()'],
          correctAnswer: 'NOW()'
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'What does the HAVING clause do?',
          options: [
            'Filters rows before grouping',
            'Filters groups after GROUP BY',
            'Sorts the results',
            'Joins tables'
          ],
          correctAnswer: 'Filters groups after GROUP BY'
        },
        {
          id: 3,
          type: 'drag-drop',
          question: 'Arrange the correct order for a complex query:',
          options: [
            'ORDER BY column',
            'SELECT column, COUNT(*)',
            'FROM table',
            'GROUP BY column',
            'WHERE condition',
            'HAVING COUNT(*) > 1'
          ],
          correctAnswer: [
            'SELECT column, COUNT(*)',
            'FROM table',
            'WHERE condition',
            'GROUP BY column',
            'HAVING COUNT(*) > 1',
            'ORDER BY column'
          ]
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: 'Which is true about subqueries?',
          options: [
            'They always return multiple rows',
            'They cannot be used in WHERE clause',
            'They are queries nested inside another query',
            'They are faster than JOINs'
          ],
          correctAnswer: 'They are queries nested inside another query'
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: 'What does the DISTINCT keyword do?',
          options: [
            'Sorts the results',
            'Removes duplicate rows',
            'Counts the rows',
            'Groups the results'
          ],
          correctAnswer: 'Removes duplicate rows'
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getScoreStatus = (quizId) => {
    const score = userScores[quizId];
    if (!score) return null;
    
    const isCompleted = score.highest_score === score.total_questions;
    return {
      isCompleted,
      score: score.highest_score,
      total: score.total_questions,
      completedAt: score.completed_at
    };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">SQL Quizzes</h1>
        <p className="text-gray-300 text-lg mx-auto">
          Test your SQL knowledge with our interactive quizzes. Track your progress and master SQL step by step.
        </p>
      </div>

      <div className="flex flex-col flex-wrap gap-6">
        {quizzes.map((quiz) => {
          const scoreStatus = getScoreStatus(quiz.id);
          
          return (
            <div 
              key={quiz.id}
              className="bg-[#030814] border border-gray-600 rounded-lg p-6 hover:border-[#0059FF] transition-all duration-300 relative"
            >
              {/* Score Status Badge */}
              {scoreStatus && (
                <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  scoreStatus.isCompleted 
                    ? 'bg-emerald-400/20 text-emerald-400' 
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {scoreStatus.isCompleted ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Completed {scoreStatus.score}/{scoreStatus.total}
                    </>
                  ) : (
                    <>
                      <Star className="w-3 h-3" />
                      {scoreStatus.score}/{scoreStatus.total}
                    </>
                  )}
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