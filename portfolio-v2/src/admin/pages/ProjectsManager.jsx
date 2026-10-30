import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaStar, 
  FaSearch, 
  FaTimes, 
  FaCheck,
  FaExclamationCircle,
  FaMagic,
  FaGithub,
  FaSpinner
} from 'react-icons/fa';
import { usePortfolioData } from '../../context/DataContext';
import { parseGitHubRepo, fetchGitHubReadme, fetchGitHubRepoDetails, fetchGitHubUserRepos } from '../../utils/github';
import { extractProjectWithAI, isGeminiConfigured } from '../../lib/gemini';
import './ProjectsManager.css';

const defaultProjectForm = {
  title: '',
  summary: '',
  problem: '',
  role: '',
  outcome: '',
  stack: [],
  featured: false,
  accent: '#0f766e',
  repo_url: '',
  demo_url: '',
  case_study_url: '',
};

const ACCENT_PRESETS = [
  '#0f766e', // Teal
  '#1d4ed8', // Blue
  '#0369a1', // Sky
  '#4f46e5', // Indigo
  '#b91c1c', // Crimson
  '#c2410c', // Orange
  '#7c3aed', // Purple
  '#059669', // Emerald
];

const ProjectsManager = () => {
  const { 
    projects, 
    createProject, 
    updateProject, 
    deleteProject, 
    toggleProjectFeatured 
  } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultProjectForm);
  const [tagInput, setTagInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GitHub AI Auto-Fill states
  const [githubInput, setGithubInput] = useState('');
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [autoFillOpen, setAutoFillOpen] = useState(false);
  const [userRepos, setUserRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  const filteredProjects = projects.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchTitle = p.title.toLowerCase().includes(term);
    const matchStack = p.stack?.some((t) => t.toLowerCase().includes(term));
    return matchTitle || matchStack;
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(defaultProjectForm);
    setTagInput('');
    setErrorMsg('');
    setGithubInput('');
    setAiStatus(null);
    setAutoFillOpen(false);
    setUserRepos([]);
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      summary: project.summary || '',
      problem: project.problem || '',
      role: project.role || '',
      outcome: project.outcome || '',
      stack: project.stack || [],
      featured: Boolean(project.featured),
      accent: project.accent || '#0f766e',
      repo_url: project.links?.repo || '',
      demo_url: project.links?.demo || '',
      case_study_url: project.links?.caseStudy || '',
    });
    setTagInput('');
    setErrorMsg('');
    setGithubInput(project.links?.repo || '');
    setAiStatus(null);
    setAutoFillOpen(false);
    setUserRepos([]);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setErrorMsg('');
    setGithubInput('');
    setAiStatus(null);
    setAutoFillOpen(false);
    setUserRepos([]);
  };

  const handleToggleAutoFill = async () => {
    const opening = !autoFillOpen;
    setAutoFillOpen(opening);
    if (!opening || userRepos.length || isLoadingRepos) return;

    const username = import.meta.env.VITE_GITHUB_USERNAME;
    if (!username) return;

    try {
      setIsLoadingRepos(true);
      const repositories = await fetchGitHubUserRepos(username);
      setUserRepos(repositories);
    } catch (err) {
      setAiStatus({ type: 'error', message: err.message || 'Could not load public repositories.' });
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,+|,+$/g, '');
      if (val && !formData.stack.includes(val)) {
        setFormData((prev) => ({ ...prev, stack: [...prev.stack, val] }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.filter((t) => t !== tagToRemove),
    }));
  };

  const handleAnalyzeGitHub = async () => {
    if (!githubInput.trim()) return;

    const parsed = parseGitHubRepo(githubInput);
    if (!parsed) {
      setAiStatus({
        type: 'error',
        message: 'Invalid GitHub URL. Use format: https://github.com/owner/repo or owner/repo',
      });
      return;
    }

    try {
      setIsAnalyzingAi(true);
      setAiStatus({
        type: 'info',
        message: `Fetching README from ${parsed.owner}/${parsed.repo}...`,
      });

      const repoDetails = await fetchGitHubRepoDetails(parsed.owner, parsed.repo);
      const readmeResult = await fetchGitHubReadme(
        parsed.owner,
        parsed.repo,
        repoDetails.default_branch
      );

      if (readmeResult.error || !readmeResult.content) {
        setAiStatus({
          type: 'error',
          message: readmeResult.error || 'README not found in this repository.',
        });
        return;
      }

      setAiStatus({
        type: 'info',
        message: isGeminiConfigured
          ? 'Analyzing project details with Google Gemini AI...'
          : 'Extracting project details using smart markdown parser...',
      });

      const aiResult = await extractProjectWithAI(readmeResult.content, {
        owner: parsed.owner,
        repo: parsed.repo,
        ...repoDetails,
      });

      const extracted = aiResult.data;

      setFormData((prev) => ({
        ...prev,
        title: extracted.title || prev.title,
        summary: extracted.summary || prev.summary,
        problem: extracted.problem || prev.problem,
        role: extracted.role || prev.role,
        outcome: extracted.outcome || prev.outcome,
        stack: Array.from(new Set([...prev.stack, ...(extracted.stack || [])])),
        accent: extracted.accent || prev.accent,
        repo_url: `https://github.com/${parsed.owner}/${parsed.repo}`,
        demo_url: extracted.demo_url || prev.demo_url,
      }));

      setAiStatus({
        type: 'success',
        message: aiResult.source === 'gemini'
          ? '✨ Project fields successfully auto-filled using Google Gemini AI!'
          : '✨ Project fields populated using smart markdown parser! (Add VITE_GEMINI_API_KEY in .env for advanced AI extraction)',
      });
    } catch (err) {
      setAiStatus({
        type: 'error',
        message: err.message || 'Error analyzing repository.',
      });
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.summary.trim()) {
      setErrorMsg('Title and summary are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        problem: formData.problem.trim() || null,
        role: formData.role.trim() || null,
        outcome: formData.outcome.trim() || null,
        stack: formData.stack,
        featured: formData.featured,
        accent: formData.accent,
        repo_url: formData.repo_url.trim() || null,
        demo_url: formData.demo_url.trim() || null,
        case_study_url: formData.case_study_url.trim() || null,
      };

      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject({
          ...payload,
          order_index: projects.length,
        });
      }

      handleCloseModal();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save project. Ensure Supabase credentials are configured.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProject(id);
      } catch (err) {
        alert(err.message || 'Error deleting project');
      }
    }
  };

  const handleToggleFeatured = async (p) => {
    try {
      await toggleProjectFeatured(p.id, p.featured);
    } catch (err) {
      alert(err.message || 'Failed to toggle featured status');
    }
  };

  return (
    <div className="projects-manager">
      <div className="manager-header">
        <div>
          <h1>Projects Manager</h1>
          <p className="manager-subtitle">
            Create, edit, and organize projects shown on your portfolio.
          </p>
        </div>

        <button onClick={handleOpenNew} className="admin-btn primary-btn">
          <FaPlus size={13} />
          <span>New Project</span>
        </button>
      </div>

      <div className="manager-toolbar surface-card">
        <div className="search-box">
          <FaSearch className="search-icon" size={14} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by name or technology stack..."
          />
        </div>
        <div className="toolbar-meta">
          <span>{filteredProjects.length} of {projects.length} projects</span>
        </div>
      </div>

      <div className="projects-table-wrap surface-card">
        <table className="projects-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Accent</th>
              <th>Project Title & Summary</th>
              <th>Technologies</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Featured</th>
              <th style={{ width: '140px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No projects match your search query.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span 
                      className="table-accent-dot" 
                      style={{ backgroundColor: p.accent }} 
                      title={p.accent}
                    />
                  </td>
                  <td>
                    <strong className="project-table-title">{p.title}</strong>
                    <p className="project-table-summary">{p.summary}</p>
                  </td>
                  <td>
                    <div className="tag-chips">
                      {p.stack?.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`star-btn ${p.featured ? 'active' : ''}`}
                      title={p.featured ? 'Featured on homepage' : 'Mark as featured'}
                      aria-label="Toggle featured"
                    >
                      <FaStar size={16} />
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="row-actions">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="icon-action-btn edit"
                        title="Edit project"
                        aria-label="Edit project"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="icon-action-btn delete"
                        title="Delete project"
                        aria-label="Delete project"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content surface-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={handleCloseModal} className="close-btn" aria-label="Close">
                <FaTimes size={16} />
              </button>
            </div>

            {errorMsg && (
              <div className="modal-error-banner" role="alert">
                <FaExclamationCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* AI GitHub Auto-Fill Panel */}
            <section className="ai-autofill-panel" aria-label="GitHub project auto-fill">
              <button
                type="button"
                className="ai-autofill-toggle"
                aria-expanded={autoFillOpen}
                onClick={handleToggleAutoFill}
              >
                <span className="ai-header-left">
                  <FaMagic className="ai-magic-icon" size={14} />
                  <strong>Auto-fill from GitHub</strong>
                  <span className="ai-engine-badge">
                    {isGeminiConfigured ? 'Gemini AI' : 'Smart Parser'}
                  </span>
                </span>
                <span className="ai-header-hint">{autoFillOpen ? 'Hide' : 'Import README details'}</span>
              </button>

              {autoFillOpen && <div className="ai-autofill-body">
                <div className="ai-input-row">
                  <div className="ai-url-wrap">
                    <FaGithub className="ai-github-icon" size={16} />
                    <input
                      type="text"
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                      aria-label="GitHub repository URL"
                      placeholder="https://github.com/marvinlavoe/repo-name or owner/repo"
                      disabled={isAnalyzingAi}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAnalyzeGitHub();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAnalyzeGitHub}
                    disabled={isAnalyzingAi || !githubInput.trim()}
                    className="admin-btn ai-generate-btn"
                  >
                    {isAnalyzingAi ? (
                      <>
                        <FaSpinner className="spin" size={13} />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <FaMagic size={13} />
                        <span>Analyze with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {import.meta.env.VITE_GITHUB_USERNAME && (
                  <div className="ai-repo-presets" aria-label="Recent public repositories">
                    <span className="ai-repo-label">{isLoadingRepos ? 'Loading your repositories…' : 'Quick pick'}</span>
                    {userRepos.map((repo) => (
                      <button
                        key={repo.full_name}
                        type="button"
                        className="ai-repo-preset"
                        title={repo.description || repo.full_name}
                        onClick={() => setGithubInput(repo.html_url)}
                        disabled={isAnalyzingAi}
                      >
                        {repo.name}
                      </button>
                    ))}
                  </div>
                )}

                {aiStatus && (
                  <div className={`ai-status-note ${aiStatus.type}`} role={aiStatus.type === 'error' ? 'alert' : 'status'} aria-live="polite">
                    {aiStatus.type === 'success' ? (
                      <FaCheck size={12} color="#16a34a" />
                    ) : aiStatus.type === 'info' ? (
                      <FaSpinner className="spin" size={12} />
                    ) : (
                      <FaExclamationCircle size={12} color="#dc2626" />
                    )}
                    <span>{aiStatus.message}</span>
                  </div>
                )}
              </div>}
            </section>

            <form onSubmit={handleSubmit} className="project-modal-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="proj-title">Project Title *</label>
                  <input
                    id="proj-title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Gesture-Controlled Mecanum Wheel Robot"
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Accent Color</label>
                  <div className="accent-picker-row">
                    <input
                      type="color"
                      value={formData.accent}
                      onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                      className="color-picker-input"
                    />
                    <div className="presets-row">
                      {ACCENT_PRESETS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`preset-circle ${formData.accent === color ? 'selected' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setFormData({ ...formData, accent: color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="proj-summary">Short Summary *</label>
                <textarea
                  id="proj-summary"
                  required
                  rows="2"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="One sentence overview describing what this project is and does."
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="proj-problem">Problem Statement</label>
                  <textarea
                    id="proj-problem"
                    rows="2"
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="What problem or constraint prompted this build?"
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="proj-outcome">Outcome / Result</label>
                  <textarea
                    id="proj-outcome"
                    rows="2"
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="What did you build and deliver?"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="proj-role">My Role & Responsibilities</label>
                <input
                  id="proj-role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Designed the control flow, wireless communication, and hardware assembly."
                />
              </div>

              <div className="form-group">
                <label>Tech Stack Tags (press Enter or comma to add)</label>
                <div className="tags-input-container">
                  {formData.stack.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="remove-tag-btn"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="e.g. Flutter, Firebase, Python"
                    className="tag-text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="proj-repo">Repository URL</label>
                  <input
                    id="proj-repo"
                    type="url"
                    value={formData.repo_url}
                    onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="proj-demo">Live Demo URL</label>
                  <input
                    id="proj-demo"
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="proj-casestudy">Case Study Link</label>
                  <input
                    id="proj-casestudy"
                    type="text"
                    value={formData.case_study_url}
                    onChange={(e) => setFormData({ ...formData, case_study_url: e.target.value })}
                    placeholder="/work/smart-workplace"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Feature on homepage & top of projects page</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="admin-btn cancel-btn">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="admin-btn primary-btn"
                >
                  <FaCheck size={13} />
                  <span>{isSubmitting ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
