const categoryService = require('../services/categoryService');

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { name, color } = req.body;
      const category = await categoryService.createCategory(req.user.id, name, color);
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories(req.user.id);
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { name, color } = req.body;
      const category = await categoryService.updateCategory(req.params.id, req.user.id, name, color);
      res.json({ message: 'Category updated successfully', category });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      await categoryService.deleteCategory(req.params.id, req.user.id);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
