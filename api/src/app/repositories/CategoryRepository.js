const db = require('../../database/index');

class CategoryRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categories');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT  * FROM categories
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByName(name) {
    const nameLowerCase = name.toLowerCase();

    const [row] = await db.query(`
      SELECT * FROM categories
      WHERE name = $1
    `, [nameLowerCase]);
    return row;
  }

  async create({
    name,
  }) {
    const nameLowerCase = name.toLowerCase();
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [nameLowerCase]);

    return row;
  }

  async update(id, {
    name,
  }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    // Remove FK from contacts
    await db.query(`
    UPDATE contacts
    SET category_id = NULL
    where category_id = $1
    `, [id]);

    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new CategoryRepository();
