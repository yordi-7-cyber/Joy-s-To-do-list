const pool = require('../config/database');

class CategoryRepository {
  async create(userId, name, color) {
    const result = await pool.query(
      'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, color]
    );
    return result.rows[0];
  }

  async findByUserId(userId) {
    const result = await pool.query(
      `SELECT c.*, COUNT(t.id) as task_count 
       FROM categories c 
       LEFT JOIN tasks t ON c.id = t.category_id 
       WHERE c.user_id = $1 
       GROUP BY c.id 
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  async update(id, userId, name, color) {
    const result = await pool.query(
      'UPDATE categories SET name = COALESCE($1, name), color = COALESCE($2, color) WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, color, id, userId]
    );
    return result.rows[0];
  }

  async delete(id, userId) {
    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = new CategoryRepository();
