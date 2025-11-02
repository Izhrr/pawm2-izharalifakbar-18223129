import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DragDropExercise from '../components/learn/DragDropExercise';
import MultipleChoiceExercise from '../components/learn/MultipleChoiceExercise';
import { quizService } from '../services/quizService';

const LearnPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [activeMaterial, setActiveMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTopicFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('topic') || 'select-topic';
  };

  const [activeTopic, setActiveTopic] = useState(getTopicFromQuery());

  useEffect(() => {
    loadMaterials();
  }, []);

  useEffect(() => {
    const topicId = getTopicFromQuery();
    setActiveTopic(topicId);
    loadMaterialByTopic(topicId);
  }, [location.search]);

  const loadMaterials = async () => {
    try {
      const data = await quizService.getAllMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    }
  };

  const loadMaterialByTopic = async (topicId) => {
    try {
      setLoading(true);
      const material = await quizService.getMaterialByTopicId(topicId);
      setActiveMaterial(material);
    } catch (error) {
      console.error('Error loading material:', error);
      setActiveMaterial(null);
    } finally {
      setLoading(false);
    }
  };

  // Static topics for navigation (you can also fetch from backend)
  const topics = [
    { id: 'select-topic', title: 'SQL SELECT', disabled: false },
    { id: 'where-topic', title: 'SQL WHERE', disabled: false },
    { id: 'orderby-topic', title: 'SQL ORDER BY', disabled: true },
    { id: 'join-topic', title: 'SQL JOIN', disabled: true },
  ];

  if (loading) {
    return (
      <main className="pt-28 pb-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-xl text-gray-400">Loading material...</div>
        </div>
      </main>
    );
  }

  if (!activeMaterial) {
    return (
      <main className="pt-28 pb-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-xl text-red-400">Material not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <article className="topic-content">
          <h1 className="text-3xl font-bold mb-4">{activeMaterial.title}</h1>
          <p className="mb-6 text-gray-300">{activeMaterial.content}</p>
          
          {activeMaterial.syntax_example && (
            <div className="bg-gray-900 border border-gray-600 rounded-lg mb-6 overflow-hidden">
              <h3 className="px-6 py-3 bg-gray-800 text-base font-semibold m-0">Syntax</h3>
              <pre className="px-6 py-6 font-mono text-sm whitespace-pre-wrap">
                <code>{activeMaterial.syntax_example}</code>
              </pre>
            </div>
          )}

          {activeMaterial.exercises && activeMaterial.exercises.map((exercise, index) => (
            <div key={exercise.id}>
              <hr className="border-gray-600 my-12" />

              <h2 className="text-xl font-semibold mb-4">{exercise.title}</h2>
              <p className="mb-6 text-gray-300">{exercise.description}</p>
              
              {exercise.exercise_type === 'drag-drop' && (
                <DragDropExercise
                  query={exercise.query_start}
                  answer={exercise.correct_answer}
                  endQuery={exercise.query_end}
                  options={exercise.options}
                  exerciseId={`${activeTopic}-dragdrop-${index}`}
                />
              )}

              {exercise.exercise_type === 'multiple-choice' && (
                <MultipleChoiceExercise
                  options={exercise.options}
                  exerciseId={`${activeTopic}-mcq-${index}`}
                  correctFeedback={exercise.correct_feedback}
                  incorrectFeedback={exercise.incorrect_feedback}
                />
              )}
            </div>
          ))}
        </article>
      </div>
    </main>
  );
};
export default LearnPage;