import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiaryPageUI from './DiaryPage'; // Page to create a diary entry
import EntryPageUI from './EntryPage'; // Page to view previous entries

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiaryPageUI />} />
        <Route path="/entries" element={<EntryPageUI />} />
      </Routes>
    </Router>
  );
}

export default App;