const pool = require('../config/database');

class TaskRepository {
  async create(userId, taskData) {
    const { title, description, status, priority, due_date, category_id } = taskData;
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority, due_date, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, title, description, status || 'pending', priority || 'medium', due_date, category_id]
    );
    return result.rows[0];
  }

  async findByUserId(userId, filters = {}) {
    let query = 'SELECT t.*, c.name as category_name FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1';
    const params = [userId];
    let paramCount = 1;

    if (filters.status) {
      paramCount++;
      query += ` AND t.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.priority) {
      paramCount++;
      query += ` AND t.priority = $${paramCount}`;
      params.push(filters.priority);
    }

    if (filters.search) {
      paramCount++;
      query += ` AND (t.title ILIKE $${paramCount} OR t.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
    }

    query += ' ORDER BY t.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  async update(id, userId, taskData) {
    const { title, description, status, priority, due_date, category_id } = taskData;
    const result = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           due_date = COALESCE($5, due_date),
           category_id = COALESCE($6, category_id),
           updated_at = CURRENT_TIMESTAMP,
           completed_at = CASE WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [title, description, status, priority, due_date, category_id, id, userId]
    );
    return result.rows[0];
  }

  async delete(id, userId) {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  }

  async getStats(userId) {
    const result = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE due_date < CURRENT_TIMESTAMP AND status != 'completed') as overdue
       FROM tasks WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  }
}

module.exports = new TaskRepository();
