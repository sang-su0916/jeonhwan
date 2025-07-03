import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Home, Onboarding, Dashboard, Checklist, Documents } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;