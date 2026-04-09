import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ChatbotPage from './ChatbotPage';
import TermsPage from './TermsPage';
import ForgotPasswordPage from './ForgotPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định kiểm tra nếu có user thì vào chatbot, không thì vào login */}
        <Route 
          path="/" 
          element={localStorage.getItem('currentUser') ? <Navigate to="/chatbot" replace /> : <Navigate to="/login" replace />} 
        />
        
        {/* Redirect authenticated users away from auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Có thể thêm Route 404 tại đây */}
      </Routes>
    </Router>
  );
}

export default App;