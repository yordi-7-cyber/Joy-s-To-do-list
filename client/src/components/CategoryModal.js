import React, { useState } from 'react';
import api from '../api/axios';

function CategoryModal({ categories, onClose, onSave }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#667eea');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/categories', { name, color });
      setName('');
      setColor('#667eea');
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        onSave();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Manage Categories</h2>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>

        <div style={{marginTop: '30px'}}>
          <h3 style={{marginBottom: '15px'}}>Existing Categories</h3>
          {categories.length === 0 ? (
            <p style={{color: '#999', textAlign: 'center'}}>No categories yet</p>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {categories.map(cat => (
                <div key={cat.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${cat.color || '#667eea'}`
                }}>
                  <div>
                    <strong>{cat.name}</strong>
                    <span style={{marginLeft: '10px', color: '#999', fontSize: '14px'}}>
                      ({cat.task_count || 0} tasks)
                    </span>
                  </div>
                  <button onClick={() => handleDelete(cat.id)} className="icon-btn">🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{marginTop: '20px'}}>
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
