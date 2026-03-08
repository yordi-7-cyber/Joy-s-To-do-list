import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskModal from './TaskModal';
import CategoryModal from './CategoryModal';

function Dashboard({ setToken }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const [tasksRes, categoriesRes, dashboardRes] = await Promise.all([
        api.get('/tasks', { params: filters }),
        api.get('/categories'),
        api.get('/dashboard')
      ]);
      setTasks(tasksRes.data.tasks);
      setCategories(categoriesRes.data.categories);
      setDashboard(dashboardRes.data.dashboard);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Joy's To-Do List</h1>
        <div className="header-actions">
          <button onClick={() => setShowCategoryModal(true)} className="btn btn-secondary" style={{width: 'auto', padding: '10px 20px'}}>
            Categories
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard">
        <div className="stat-card">
          <h3>{dashboard.totalTasks || 0}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{dashboard.completedTasks || 0}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{dashboard.pendingTasks || 0}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h3>{dashboard.overdueTasks || 0}</h3>
          <p>Overdue</p>
        </div>
        <div className="stat-card">
          <h3>{dashboard.completionPercentage || 0}%</h3>
          <p>Completion</p>
        </div>
      </div>

      <div className="tasks-section">
        <div className="tasks-header">
          <h2>My Tasks</h2>
          <button onClick={() => { setEditingTask(null); setShowTaskModal(true); }} className="btn btn-primary" style={{width: 'auto', padding: '10px 20px'}}>
            + New Task
          </button>
        </div>

        <div className="filters">
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filters.priority} onChange={(e) => setFilters({...filters, priority: e.target.value})}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks yet</h3>
              <p>Create your first task to get started!</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <div className="task-meta">
                    <span className="badge badge-status">{task.status}</span>
                    <span className="badge badge-priority">{task.priority}</span>
                    {task.category_name && <span className="badge badge-category">{task.category_name}</span>}
                    {task.due_date && <span className="badge">Due: {new Date(task.due_date).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEditTask(task)} className="icon-btn">✏️</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="icon-btn">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          categories={categories}
          onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
          onSave={fetchData}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onSave={fetchData}
        />
      )}
    </div>
  );
}

export default Dashboard;
