import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import TaskPage from './components/TaskPage';
import UploadPage from './components/UploadPage';
import ResultPage from './components/ResultPage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Private Routes */}
          <Route path="/task" element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          } />
          <Route path="/upload" element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          } />
          <Route path="/result" element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;