const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  async createCategory(userId, name, color) {
    if (!name || name.trim() === '') {
      throw new Error('Category name is required');
    }
    return await categoryRepository.create(userId, name, color);
  }

  async getCategories(userId) {
    return await categoryRepository.findByUserId(userId);
  }

  async updateCategory(categoryId, userId, name, color) {
    const category = await categoryRepository.findById(categoryId, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return await categoryRepository.update(categoryId, userId, name, color);
  }

  async deleteCategory(categoryId, userId) {
    const category = await categoryRepository.delete(categoryId, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}

module.exports = new CategoryService();
