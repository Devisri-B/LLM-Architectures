// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorerPage from './ExplorerPage';
// import './App.css';

function App() {
  return (
    // ADD THIS BASENAME PROP:
    // This tells React Router that your app lives in the "/LLM-Architectures" folder
    <Router basename="/LLM-Architectures">
      
      <div>
        <main>
          <Routes>
            <Route path="/*" element={<ExplorerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
