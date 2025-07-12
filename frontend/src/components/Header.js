import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  return (
    <header className="header">
      <div>
        <h1>JKWI Online Store</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <div className="user-info">
            <Link to="/dashboard">Dashboard</Link>
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;