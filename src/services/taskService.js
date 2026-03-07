const taskRepository = require('../repositories/taskRepository');

class TaskService {
  async createTask(userId, taskData) {
    if (!taskData.title || taskData.title.trim() === '') {
      throw new Error('Task title is required');
    }
    return await taskRepository.create(userId, taskData);
  }

  async getTasks(userId, filters) {
    return await taskRepository.findByUserId(userId, filters);
  }

  async getTaskById(taskId, userId) {
    const task = await taskRepository.findById(taskId, userId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async updateTask(taskId, userId, taskData) {
    const task = await taskRepository.findById(taskId, userId);
    if (!task) {
      throw new Error('Task not found');
    }
    return await taskRepository.update(taskId, userId, taskData);
  }

  async deleteTask(taskId, userId) {
    const task = await taskRepository.delete(taskId, userId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }
}

module.exports = new TaskService();
