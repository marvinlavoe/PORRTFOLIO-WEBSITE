import React, { useState } from 'react';
import { 
  FaCloudUploadAlt, 
  FaCopy, 
  FaCheck, 
  FaTrash, 
  FaImage, 
  FaExclamationCircle 
} from 'react-icons/fa';
import { uploadMedia, deleteMedia, isSupabaseConfigured } from '../../lib/supabase';
import './MediaManager.css';

const MediaManager = () => {
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (!isSupabaseConfigured) {
      setErrorMsg('Supabase Storage is not connected. Add credentials to .env to upload files.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    for (const file of files) {
      const { url, path, error } = await uploadMedia(file, 'portfolio');
      if (error) {
        setErrorMsg(error.message || 'Error uploading file.');
      } else if (url) {
        setUploads((prev) => [
          {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            url,
            path,
            uploadedAt: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
    }

    setIsUploading(false);
  };

  const handleCopyUrl = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDeleteItem = async (item, index) => {
    if (item.path) {
      await deleteMedia(item.path);
    }
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="media-manager">
      <div className="manager-header">
        <div>
          <h1>Media Library & Storage</h1>
          <p className="manager-subtitle">
            Upload screenshots, diagrams, and prototype mockups directly to Supabase Storage bucket <code>portfolio-media</code>.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="status-banner error" role="alert">
          <FaExclamationCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="upload-dropzone surface-card">
        <FaCloudUploadAlt size={48} className="dropzone-icon" />
        <h3>Drop media here or browse</h3>
        <p>Supports PNG, JPG, WEBP, SVG, and GIF up to 10MB</p>

        <label className="admin-btn primary-btn upload-browse-btn">
          <span>{isUploading ? 'Uploading Media...' : 'Select Files to Upload'}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="uploads-section">
        <h2>Uploaded Assets {uploads.length > 0 && `(${uploads.length})`}</h2>

        {uploads.length === 0 ? (
          <div className="empty-media surface-card">
            <FaImage size={32} />
            <p>No media uploaded in this session yet.</p>
            <span>Upload files above to generate public URLs for your case studies and projects.</span>
          </div>
        ) : (
          <div className="media-cards-grid">
            {uploads.map((item, idx) => (
              <div key={idx} className="media-card surface-card">
                <div className="media-preview-box">
                  <img src={item.url} alt={item.name} />
                </div>

                <div className="media-info">
                  <strong className="media-name" title={item.name}>{item.name}</strong>
                  <span className="media-meta">{item.size} · {item.uploadedAt}</span>

                  <div className="media-actions">
                    <button
                      onClick={() => handleCopyUrl(item.url, idx)}
                      className="admin-btn copy-btn"
                      title="Copy public URL"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <FaCheck size={12} color="#16a34a" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy size={12} />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item, idx)}
                      className="admin-btn delete-btn"
                      title="Delete asset"
                      aria-label="Delete asset"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;
