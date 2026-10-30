import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFolder, 
  FaBookOpen, 
  FaStar, 
  FaPlus, 
  FaCloudUploadAlt, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSync
} from 'react-icons/fa';
import { usePortfolioData } from '../../context/DataContext';
import { seedInitialData } from '../../utils/seedData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { 
    projects, 
    caseStudies, 
    isUsingFallback, 
    refreshData 
  } = usePortfolioData();

  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null);

  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  const handleSeed = async () => {
    try {
      setSeeding(true);
      setSeedStatus(null);
      const res = await seedInitialData();
      await refreshData();
      setSeedStatus({
        success: true,
        message: `Successfully seeded ${res.projectsCount} projects and ${res.caseStudiesCount} case studies into Supabase!`,
      });
    } catch (err) {
      setSeedStatus({
        success: false,
        message: err.message || 'Error seeding database.',
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Content Overview</h1>
          <p className="dashboard-subtitle">
            Manage and publish your portfolio projects, interactive case studies, and assets.
          </p>
        </div>

        <div className="dashboard-actions">
          <button 
            onClick={handleSeed} 
            disabled={seeding}
            className="admin-btn seed-btn"
            title="Import hardcoded portfolio items into Supabase"
          >
            <FaSync className={seeding ? 'spin' : ''} size={14} />
            <span>{seeding ? 'Seeding Data...' : 'Seed Initial Data'}</span>
          </button>
        </div>
      </div>

      {seedStatus && (
        <div className={`status-banner ${seedStatus.success ? 'success' : 'error'}`} role="alert">
          {seedStatus.success ? <FaCheckCircle size={16} /> : <FaExclamationTriangle size={16} />}
          <span>{seedStatus.message}</span>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card surface-card">
          <div className="stat-icon-wrap project-icon">
            <FaFolder size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{projects.length}</span>
          </div>
        </div>

        <div className="stat-card surface-card">
          <div className="stat-icon-wrap featured-icon">
            <FaStar size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Featured Projects</span>
            <span className="stat-value">{featuredProjectsCount}</span>
          </div>
        </div>

        <div className="stat-card surface-card">
          <div className="stat-icon-wrap case-study-icon">
            <FaBookOpen size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Case Studies</span>
            <span className="stat-value">{caseStudies.length}</span>
          </div>
        </div>

        <div className="stat-card surface-card">
          <div className="stat-icon-wrap storage-icon">
            <FaCloudUploadAlt size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Data Mode</span>
            <span className="stat-value mode-badge">
              {isUsingFallback ? 'Local Fallback' : 'Live Supabase'}
            </span>
          </div>
        </div>
      </div>

      <div className="quick-access-section">
        <h2>Quick Actions</h2>
        <div className="action-cards-grid">
          <Link to="/admin/projects" className="action-card surface-card">
            <div className="action-card-header">
              <FaFolder size={18} />
              <FaPlus size={14} />
            </div>
            <h3>Add New Project</h3>
            <p>Publish a new technical prototype, app build, or hardware experiment.</p>
          </Link>

          <Link to="/admin/case-studies" className="action-card surface-card">
            <div className="action-card-header">
              <FaBookOpen size={18} />
              <FaPlus size={14} />
            </div>
            <h3>Create Case Study</h3>
            <p>Write an in-depth product design breakdown with personas, problem, and results.</p>
          </Link>

          <Link to="/admin/media" className="action-card surface-card">
            <div className="action-card-header">
              <FaCloudUploadAlt size={18} />
              <FaPlus size={14} />
            </div>
            <h3>Upload Media</h3>
            <p>Upload project mockups and screenshots directly to your storage bucket.</p>
          </Link>
        </div>
      </div>

      <div className="dashboard-lists-grid">
        <div className="list-panel surface-card">
          <div className="panel-header">
            <h3>Projects ({projects.length})</h3>
            <Link to="/admin/projects" className="panel-link">Manage all</Link>
          </div>
          <div className="panel-items">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="panel-item">
                <div className="item-title-col">
                  <strong>{p.title}</strong>
                  <span className="item-sub">{p.stack?.slice(0, 3).join(', ')}</span>
                </div>
                {p.featured && <span className="featured-chip">Featured</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="list-panel surface-card">
          <div className="panel-header">
            <h3>Case Studies ({caseStudies.length})</h3>
            <Link to="/admin/case-studies" className="panel-link">Manage all</Link>
          </div>
          <div className="panel-items">
            {caseStudies.map((cs) => (
              <div key={cs.id || cs.slug} className="panel-item">
                <div className="item-title-col">
                  <strong>{cs.title}</strong>
                  <span className="item-sub">{cs.category}</span>
                </div>
                <span className="case-slug-chip">/{cs.slug}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
