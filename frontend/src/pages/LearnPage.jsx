import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DragDropExercise from '../components/DragDropExercise';
import MultipleChoiceExercise from '../components/MultipleChoiceExercise';

const LearnPage = () => {
  const [activeTopic, setActiveTopic] = useState('select-topic');

  const topics = [
    { id: 'select-topic', title: 'SQL SELECT', disabled: false },
    { id: 'where-topic', title: 'SQL WHERE', disabled: false },
    { id: 'orderby-topic', title: 'SQL ORDER BY', disabled: true },
    { id: 'join-topic', title: 'SQL JOIN', disabled: true },
  ];

  return (
    <main className="pt-28 pb-16 flex">
      <Sidebar topics={topics} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      
      <div className="ml-70 px-10 flex-1">
        {activeTopic === 'select-topic' && (
          <article className="topic-content">
            <h1 className="text-3xl font-bold mb-4">SQL SELECT Statement</h1>
            <p className="mb-6 text-gray-300">The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.</p>
            
            <div className="bg-gray-900 border border-gray-600 rounded-lg mb-6 overflow-hidden">
              <h3 className="px-6 py-3 bg-gray-800 text-base font-semibold m-0">SELECT Syntax</h3>
              <pre className="px-6 py-6 font-mono text-sm whitespace-pre-wrap">
                <code>SELECT column1, column2, ...{'\n'}FROM table_name;</code>
              </pre>
            </div>

            <hr className="border-gray-600 my-12" />

            <h2 className="text-xl font-semibold mb-4">Exercise 1: Drag and Drop</h2>
            <p className="mb-6 text-gray-300">Complete the query below to select the "City" column from the "Customers" table.</p>
            
            <DragDropExercise
              query="SELECT City"
              answer="FROM"
              endQuery="Customers;"
              options={['FROM', 'WHERE', 'ORDER BY']}
              exerciseId="select-dragdrop"
            />

            <hr className="border-gray-600 my-12" />

            <h2 className="text-xl font-semibold mb-4">Exercise 2: Multiple Choice</h2>
            <p className="mb-6 text-gray-300">Which SQL statement is used to extract data from a database?</p>
            
            <MultipleChoiceExercise
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'EXTRACT', label: 'EXTRACT' },
                { value: 'SELECT', label: 'SELECT', correct: true },
                { value: 'OPEN', label: 'OPEN' }
              ]}
              exerciseId="select-mcq"
              correctFeedback="Correct! The SELECT statement is used to query the database."
              incorrectFeedback="Not quite. That's not the correct statement. Give it another shot!"
            />
          </article>
        )}

        {activeTopic === 'where-topic' && (
          <article className="topic-content">
            <h1 className="text-3xl font-bold mb-4">SQL WHERE Clause</h1>
            <p className="mb-6 text-gray-300">The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition.</p>
            
            <div className="bg-gray-900 border border-gray-600 rounded-lg mb-6 overflow-hidden">
              <h3 className="px-6 py-3 bg-gray-800 text-base font-semibold m-0">WHERE Syntax</h3>
              <pre className="px-6 py-6 font-mono text-sm whitespace-pre-wrap">
                <code>SELECT column1, column2, ...{'\n'}FROM table_name{'\n'}WHERE condition;</code>
              </pre>
            </div>

            <hr className="border-gray-600 my-12" />

            <h2 className="text-xl font-semibold mb-4">Exercise 1: Drag and Drop</h2>
            <p className="mb-6 text-gray-300">Complete the query to select all records where the city is 'London'.</p>
            
            <DragDropExercise
              query="SELECT * FROM Customers"
              answer="WHERE"
              endQuery="City = 'London';"
              options={['FROM', 'WHERE', 'IS']}
              exerciseId="where-dragdrop"
            />

            <hr className="border-gray-600 my-12" />

            <h2 className="text-xl font-semibold mb-4">Exercise 2: Multiple Choice</h2>
            <p className="mb-6 text-gray-300">Which operator is used to filter records based on a condition?</p>
            
            <MultipleChoiceExercise
              options={[
                { value: 'FILTER', label: 'FILTER' },
                { value: 'CONDITION', label: 'CONDITION' },
                { value: 'WHERE', label: 'WHERE', correct: true },
                { value: 'CHECK', label: 'CHECK' }
              ]}
              exerciseId="where-mcq"
              correctFeedback="Correct! The WHERE clause is used to filter records."
              incorrectFeedback="Not quite. That's not the correct operator. Give it another shot!"
            />
          </article>
        )}
      </div>
    </main>
  );
};

export default LearnPage;