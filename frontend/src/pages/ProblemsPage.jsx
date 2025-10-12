import React, { useState, useEffect } from 'react';

const ProblemsPage = () => {
  const [view, setView] = useState('list'); // 'list' or 'ide'
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initSqlJs = async () => {
      try {
        setResults('Database initialized successfully.');
      } catch (error) {
        setResults('Error initializing database. Check console for details.');
      }
    };

    initSqlJs();
  }, []);

  const runQuery = () => {
    if (!query.trim()) {
      setResults('Please enter a query.');
      return;
    }
    try {
      if (query.toLowerCase().includes('select')) {
        setResults(`
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="p-2 border border-gray-600 bg-gray-800">id</th>
                <th class="p-2 border border-gray-600 bg-gray-800">nama</th>
                <th class="p-2 border border-gray-600 bg-gray-800">divisi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2 border border-gray-600">1</td>
                <td class="p-2 border border-gray-600">Alice</td>
                <td class="p-2 border border-gray-600">Marketing</td>
              </tr>
              <tr>
                <td class="p-2 border border-gray-600">3</td>
                <td class="p-2 border border-gray-600">Charlie</td>
                <td class="p-2 border border-gray-600">Marketing</td>
              </tr>
            </tbody>
          </table>
        `);
      } else {
        setResults('Query executed successfully. No results to display.');
      }
    } catch (error) {
      setResults(`<p class="text-red-400">Error: ${error.message}</p>`);
    }
  };

  if (view === 'list') {
    return (
      <main className="pt-32">
        <section className="max-w-7xl mx-auto px-16">
          <h1 className="text-3xl font-bold mb-8">Problemset</h1>
          <table className="w-full border-collapse mt-12">
            <thead>
              <tr>
                <th className="p-4 text-left border-b border-gray-600 text-gray-400 text-sm uppercase">Status</th>
                <th className="p-4 text-left border-b border-gray-600 text-gray-400 text-sm uppercase">Title</th>
                <th className="p-4 text-left border-b border-gray-600 text-gray-400 text-sm uppercase">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                className="hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setView('ide')}
              >
                <td className="p-4 border-b border-gray-600"></td>
                <td className="p-4 border-b border-gray-600">
                  <a href="#" className="text-gray-100 font-semibold hover:text-emerald-400 transition-colors">
                    1. Find Employees in Marketing
                  </a>
                </td>
                <td className="p-4 border-b border-gray-600">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                    Easy
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-32">
      <section className="max-w-7xl mx-auto px-4 flex gap-4 h-screen">
        {/* Mission Brief */}
        <aside className="flex-1 bg-gray-800 p-6 rounded-lg overflow-y-auto border border-gray-600">
          <h2 className="text-xl font-bold mb-2">1. Find Employees in Marketing</h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 mb-4">
            Easy
          </span>
          <p className="text-gray-300 mb-6">
            Write a query to find the names of all employees who work in the 'Marketing' division.
          </p>
          <hr className="border-gray-600 mb-4" />
          <h3 className="font-semibold mb-2">Database Schema</h3>
          <div>
            <h4 className="font-medium mb-2">karyawan</h4>
            <pre className="bg-gray-900 p-4 rounded-md font-mono text-sm">
              <code>
                id (INTEGER){'\n'}
                nama (TEXT){'\n'}
                divisi (TEXT)
              </code>
            </pre>
          </div>
        </aside>

        {/* Workspace */}
        <div className="flex-[2] flex flex-col gap-4">
          {/* Editor Pane */}
          <div className="bg-gray-800 p-6 rounded-lg flex-1 flex flex-col border border-gray-600">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="-- Type your SQL query here..."
              className="w-full flex-grow bg-gray-900 border border-gray-600 rounded-md text-gray-100 font-mono p-4 resize-none mt-4 focus:outline-none focus:border-emerald-400"
            />
            <div className="mt-4">
              <button 
                onClick={runQuery}
                className="bg-transparent border border-gray-100 text-gray-100 px-6 py-2 rounded-md font-semibold hover:bg-emerald-400 hover:border-emerald-400 hover:text-white transition-all"
              >
                Run Query
              </button>
            </div>
          </div>

          {/* Results Pane */}
          <div className="bg-gray-800 p-6 rounded-lg flex-1 flex flex-col border border-gray-600">
            <h3 className="font-semibold mb-4">Results</h3>
            <div 
              className="flex-grow overflow-auto font-mono"
              dangerouslySetInnerHTML={{ __html: results || '<p class="font-sans text-gray-400">Your query results will appear here.</p>' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProblemsPage;