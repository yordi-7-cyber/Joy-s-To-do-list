const taskRepository = require('../repositories/taskRepository');

class DashboardService {
  async getDashboard(userId) {
    const stats = await taskRepository.getStats(userId);
    
    const total = parseInt(stats.total) || 0;
    const completed = parseInt(stats.completed) || 0;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: parseInt(stats.pending) || 0,
      inProgressTasks: parseInt(stats.in_progress) || 0,
      overdueTasks: parseInt(stats.overdue) || 0,
      completionPercentage
    };
  }
}

module.exports = new DashboardService();
