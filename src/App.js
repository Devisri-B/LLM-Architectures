// src/App.jsx (Corrected Version)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Link is no longer needed here
import ExplorerPage from './ExplorerPage';
// Import your main CSS if you have one (optional)
// import './App.css';

function App() {
  return (
    <Router>
      {/* Remove className="App" unless you have specific styles for it */}
      <div>
        {/* The <header> block that was here is NOW REMOVED */}

        {/* Keep the main content area */}
        {/* Remove inline styles if you prefer to use CSS files */}
        <main>
          <Routes>
            {/* ExplorerPage will now render its own header */}
            <Route path="/*" element={<ExplorerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;