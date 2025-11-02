import { supabase } from '../lib/supabaseClient';

export const quizService = {
  // ========== QUIZ FUNCTIONS ==========
  
  // Get all quizzes with categories
  async getAllQuizzes() {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        category:quiz_categories(*),
        questions:quiz_questions(*)
      `)
      .eq('is_active', true)
      .order('difficulty');

    if (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }

    // Sort questions by question_number
    data.forEach(quiz => {
      if (quiz.questions) {
        quiz.questions.sort((a, b) => a.question_number - b.question_number);
        // Parse JSONB fields
        quiz.questions = quiz.questions.map(q => ({
          id: q.question_number,
          type: q.question_type,
          question: q.question_text,
          options: q.options,
          correctAnswer: q.correct_answer
        }));
      }
    });

    return data;
  },

  // Get quiz by quiz_id
  async getQuizByQuizId(quizId) {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        category:quiz_categories(*),
        questions:quiz_questions(*)
      `)
      .eq('quiz_id', quizId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }

    // Sort and transform questions
    if (data.questions) {
      data.questions.sort((a, b) => a.question_number - b.question_number);
      data.questions = data.questions.map(q => ({
        id: q.question_number,
        type: q.question_type,
        question: q.question_text,
        options: q.options,
        correctAnswer: q.correct_answer
      }));
    }

    // Transform to match frontend format
    return {
      id: data.quiz_id,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      estimatedTime: data.estimated_time,
      questions: data.questions
    };
  },

  // ========== SCORE FUNCTIONS ==========
  
  // Get user scores
  async getUserScores(userId) {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching scores:', error);
      throw error;
    }

    // Transform to object format for easy lookup
    const scoresMap = {};
    data.forEach(score => {
      scoresMap[score.quiz_id] = {
        highest_score: score.highest_score,
        total_questions: score.total_questions,
        completed_at: score.completed_at
      };
    });

    return scoresMap;
  },

  // Save or update quiz score
  async saveQuizScore(userId, quizId, score, totalQuestions) {
    try {
      // Check existing score
      const { data: existingScore } = await supabase
        .from('quiz_scores')
        .select('highest_score, id')
        .eq('user_id', userId)
        .eq('quiz_id', quizId)
        .maybeSingle();

      const shouldUpdate = !existingScore || score > existingScore.highest_score;

      if (shouldUpdate) {
        const { data, error } = await supabase
          .from('quiz_scores')
          .upsert({
            user_id: userId,
            quiz_id: quizId,
            highest_score: score,
            total_questions: totalQuestions,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,quiz_id'
          })
          .select();

        if (error) throw error;
        return data;
      }

      return existingScore;
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  },

  // ========== LEARNING FUNCTIONS ==========
  
  // Get all learning materials
  async getAllMaterials() {
    const { data, error } = await supabase
      .from('learning_materials')
      .select(`
        *,
        exercises:learning_exercises(*)
      `)
      .eq('is_active', true)
      .order('order_index');

    if (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }

    // Sort exercises
    data.forEach(material => {
      if (material.exercises) {
        material.exercises.sort((a, b) => a.exercise_number - b.exercise_number);
      }
    });

    return data;
  },

  // Get material by topic_id
  async getMaterialByTopicId(topicId) {
    const { data, error } = await supabase
      .from('learning_materials')
      .select(`
        *,
        exercises:learning_exercises(*)
      `)
      .eq('topic_id', topicId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching material:', error);
      throw error;
    }

    // Sort exercises
    if (data.exercises) {
      data.exercises.sort((a, b) => a.exercise_number - b.exercise_number);
    }

    return data;
  }
};