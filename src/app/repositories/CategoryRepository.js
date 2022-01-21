const db = require('../../database/index');

class CategoryRepository {
  async findAll(orderBy = 'asc') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM CATEGORIES  ORDER BY name ${direction}`);
    return rows;
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
}

module.exports = new CategoryRepository();
