const taskService = require('../services/taskService');

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.user.id, req.body);
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        search: req.query.search
      };
      const tasks = await taskService.getTasks(req.user.id, filters);
      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  async getTask(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.user.id);
      res.json({ task });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
      res.json({ message: 'Task updated successfully', task });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id, req.user.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
