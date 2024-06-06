import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRestaurantPage from './pages/AddRestaurantPage';
import AddUserPage from './pages/addUserPage';
import RateRestaurantPage from './pages/RateRestaurantPage';
import ViewReviewsPage from './pages/ViewReviewsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddRestaurantPage />
            </ProtectedRoute>
          } />
          <Route path="/add-user" element={
            <ProtectedRoute>
              <AddUserPage />
            </ProtectedRoute>
          } />
          <Route path="/rate/:id" element={
            <ProtectedRoute>
              <RateRestaurantPage />
            </ProtectedRoute>
          } />
          <Route path="/reviews/:id" element={
            <ProtectedRoute>
              <ViewReviewsPage />
            </ProtectedRoute>
          } />
          <Route path="/restaurant/:id" element={
            <ProtectedRoute>
              <RestaurantDetailsPage />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;