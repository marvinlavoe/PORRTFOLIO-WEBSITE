import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaCheck,
  FaExclamationCircle 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/DataContext';
import './CaseStudiesManager.css';

const defaultCaseStudyForm = {
  slug: '',
  number: '01',
  title: '',
  category: '',
  description: '',
  role: 'UX/UI Designer',
  timeline: '4–6 weeks',
  platform: 'Web application',
  accent: 'workplace',
  mockData: false,
  problem: '',
  goal: '',
  tools: [],
  researchText: '',
  findingsText: '',
  flowText: '',
};

const ACCENT_THEMES = [
  { value: 'workplace', label: 'Workplace (Corporate / Emerald)' },
  { value: 'field', label: 'Field (Operations / Amber)' },
  { value: 'consumer', label: 'Consumer (Mobile / Blue)' },
];

const CaseStudiesManager = () => {
  const { 
    caseStudies, 
    createCaseStudy, 
    updateCaseStudy, 
    deleteCaseStudy 
  } = usePortfolioData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultCaseStudyForm);
  const [toolsInput, setToolsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(defaultCaseStudyForm);
    setToolsInput('');
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleOpenEdit = (cs) => {
    setEditingId(cs.id || cs.slug);
    setFormData({
      slug: cs.slug || '',
      number: cs.number || '01',
      title: cs.title || '',
      category: cs.category || '',
      description: cs.description || '',
      role: cs.role || '',
      timeline: cs.timeline || '',
      platform: cs.platform || '',
      accent: cs.accent || 'workplace',
      mockData: Boolean(cs.mockData),
      problem: cs.problem || '',
      goal: cs.goal || '',
      tools: cs.tools || [],
      researchText: Array.isArray(cs.research) ? cs.research.join('\n') : '',
      findingsText: Array.isArray(cs.findings) ? cs.findings.join('\n') : '',
      flowText: Array.isArray(cs.flow) ? cs.flow.join(', ') : '',
      users: cs.users || [],
      journey: cs.journey || [],
      screens: cs.screens || [],
      reflections: cs.reflections || [],
    });
    setToolsInput('');
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setErrorMsg('');
  };

  const handleAddTool = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = toolsInput.trim().replace(/^,+|,+$/g, '');
      if (val && !formData.tools.includes(val)) {
        setFormData((prev) => ({ ...prev, tools: [...prev.tools, val] }));
        setToolsInput('');
      }
    }
  };

  const handleRemoveTool = (tool) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t !== tool),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.slug.trim()) {
      setErrorMsg('Title and slug are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        slug: formData.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
        number: formData.number.trim(),
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        role: formData.role.trim() || null,
        timeline: formData.timeline.trim() || null,
        platform: formData.platform.trim() || null,
        accent: formData.accent,
        mock_data: formData.mockData,
        problem: formData.problem.trim() || null,
        goal: formData.goal.trim() || null,
        tools: formData.tools,
        research: formData.researchText
          ? formData.researchText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
        findings: formData.findingsText
          ? formData.findingsText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
        flow: formData.flowText
          ? formData.flowText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        users: formData.users || [],
        journey: formData.journey || [],
        screens: formData.screens || [],
        reflections: formData.reflections || [],
      };

      if (editingId && editingId !== formData.slug) {
        await updateCaseStudy(editingId, payload);
      } else {
        await createCaseStudy({
          ...payload,
          order_index: caseStudies.length,
        });
      }

      handleCloseModal();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save case study.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (cs) => {
    if (window.confirm(`Are you sure you want to delete case study "${cs.title}"?`)) {
      try {
        await deleteCaseStudy(cs.id || cs.slug);
      } catch (err) {
        alert(err.message || 'Error deleting case study');
      }
    }
  };

  return (
    <div className="case-studies-manager">
      <div className="manager-header">
        <div>
          <h1>Case Studies Manager</h1>
          <p className="manager-subtitle">
            Manage comprehensive UX and product design case study breakdowns.
          </p>
        </div>

        <button onClick={handleOpenNew} className="admin-btn primary-btn">
          <FaPlus size={13} />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="case-studies-grid">
        {caseStudies.map((cs) => (
          <article key={cs.id || cs.slug} className={`cs-card surface-card cs-theme-${cs.accent}`}>
            <div className="cs-card-top">
              <span className="cs-number-tag">{cs.number} / SELECTED CASE STUDY</span>
              <div className="cs-card-actions">
                <Link
                  to={`/work/${cs.slug}`}
                  target="_blank"
                  className="icon-action-btn"
                  title="View live case study"
                  aria-label="View live case study"
                >
                  <FaExternalLinkAlt size={12} />
                </Link>
                <button
                  onClick={() => handleOpenEdit(cs)}
                  className="icon-action-btn edit"
                  title="Edit case study"
                  aria-label="Edit case study"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cs)}
                  className="icon-action-btn delete"
                  title="Delete case study"
                  aria-label="Delete case study"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            <h2 className="cs-card-title">{cs.title}</h2>
            <p className="cs-card-category">{cs.category}</p>
            <p className="cs-card-desc">{cs.description}</p>

            <div className="cs-card-meta-list">
              <span className="meta-pill"><strong>Role:</strong> {cs.role}</span>
              <span className="meta-pill"><strong>Platform:</strong> {cs.platform}</span>
              <span className="meta-pill"><strong>Timeline:</strong> {cs.timeline}</span>
            </div>

            <div className="cs-card-footer">
              <span className="slug-tag">/work/{cs.slug}</span>
              <div className="tools-list">
                {cs.tools?.map((tool) => (
                  <span key={tool} className="tag-chip">{tool}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content surface-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Case Study' : 'New Case Study'}</h2>
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

            <form onSubmit={handleSubmit} className="cs-modal-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="cs-title">Title *</label>
                  <input
                    id="cs-title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Emma360 Workplace"
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="cs-slug">URL Slug *</label>
                  <input
                    id="cs-slug"
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. smart-workplace"
                  />
                </div>

                <div className="form-group" style={{ width: '80px' }}>
                  <label htmlFor="cs-number">Number</label>
                  <input
                    id="cs-number"
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="cs-category">Category / Disciplines</label>
                  <input
                    id="cs-category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enterprise UX · Workflow Design · Information Architecture"
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="cs-accent">Visual Theme</label>
                  <select
                    id="cs-accent"
                    value={formData.accent}
                    onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                    className="select-input"
                  >
                    {ACCENT_THEMES.map((theme) => (
                      <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cs-description">Short Description / Lede *</label>
                <textarea
                  id="cs-description"
                  required
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A digital workplace experience that brings everyday workflows into one trackable system."
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="cs-role">Role</label>
                  <input
                    id="cs-role"
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="UX/UI Designer"
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="cs-timeline">Timeline</label>
                  <input
                    id="cs-timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="4–6 weeks · client project"
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="cs-platform">Platform</label>
                  <input
                    id="cs-platform"
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Web application"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="cs-problem">Problem Statement</label>
                  <textarea
                    id="cs-problem"
                    rows="3"
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Describe the real pain points and workflow bottlenecks."
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="cs-goal">Project Goal</label>
                  <textarea
                    id="cs-goal"
                    rows="3"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    placeholder="Describe the desired UX outcome and success criteria."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tools & Software (press Enter or comma)</label>
                <div className="tags-input-container">
                  {formData.tools.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(t)}
                        className="remove-tag-btn"
                        aria-label={`Remove tool ${t}`}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    onKeyDown={handleAddTool}
                    placeholder="Figma, React, FigJam"
                    className="tag-text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="cs-research">Research Steps (one per line)</label>
                  <textarea
                    id="cs-research"
                    rows="3"
                    value={formData.researchText}
                    onChange={(e) => setFormData({ ...formData, researchText: e.target.value })}
                    placeholder="Workflow analysis&#10;Stakeholder interviews&#10;Competitive review"
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="cs-findings">Key Findings (one per line)</label>
                  <textarea
                    id="cs-findings"
                    rows="3"
                    value={formData.findingsText}
                    onChange={(e) => setFormData({ ...formData, findingsText: e.target.value })}
                    placeholder="Status must be visible&#10;Approval ownership explicit"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cs-flow">User Flow Stages (comma-separated)</label>
                <input
                  id="cs-flow"
                  type="text"
                  value={formData.flowText}
                  onChange={(e) => setFormData({ ...formData, flowText: e.target.value })}
                  placeholder="Dashboard, Leave, Apply, Review, Supervisor, HR, Decision"
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.mockData}
                    onChange={(e) => setFormData({ ...formData, mockData: e.target.checked })}
                  />
                  <span>Mark metrics as concept / mock research data</span>
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
                  <span>{isSubmitting ? 'Saving...' : editingId ? 'Update Case Study' : 'Create Case Study'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesManager;
