import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaFolder, 
  FaBookOpen, 
  FaImages, 
  FaTachometerAlt, 
  FaSignOutAlt, 
  FaExternalLinkAlt,
  FaDatabase
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { usePortfolioData } from '../context/DataContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, signOut, isConfigured } = useAuth();
  const { isUsingFallback } = usePortfolioData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <Link to="/admin" className="admin-logo">
              PORTFOLIO <span>CMS</span>
            </Link>
            <span className="admin-badge">Admin Portal</span>
          </div>

          <div className="admin-header-actions">
            <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-action-btn view-site-btn">
              <span>View Site</span>
              <FaExternalLinkAlt size={12} />
            </Link>

            {user && (
              <div className="admin-user-pill">
                <span className="admin-user-email">{user.email}</span>
                <button 
                  onClick={handleLogout} 
                  className="admin-logout-btn" 
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {(!isConfigured || isUsingFallback) && (
        <div className="admin-notice-bar" role="alert">
          <div className="notice-inner">
            <FaDatabase size={14} />
            <span>
              {!isConfigured 
                ? 'Supabase credentials not detected in .env. Running in static fallback mode.' 
                : 'Displaying local fallback records until data is seeded or retrieved from Supabase.'}
            </span>
          </div>
        </div>
      )}

      <div className="admin-body">
        <nav className="admin-nav" aria-label="Admin Navigation">
          <NavLink 
            to="/admin" 
            end 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <FaTachometerAlt size={16} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/admin/projects" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <FaFolder size={16} />
            <span>Projects</span>
          </NavLink>
          <NavLink 
            to="/admin/case-studies" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <FaBookOpen size={16} />
            <span>Case Studies</span>
          </NavLink>
          <NavLink 
            to="/admin/media" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <FaImages size={16} />
            <span>Media Library</span>
          </NavLink>
        </nav>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
