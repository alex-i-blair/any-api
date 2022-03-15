const pool = require('../utils/pool');

module.exports = class Car {
  id;
  make;
  model;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
  }

  static async insert({ make, model }) {
    const { rows } = await pool.query(
      'INSERT INTO cars(make, model) VALUES ($1, $2) RETURNING *;',
      [make, model]
    );
    return new Car(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars;');
    return rows.map((row) => new Car(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Car(rows[0]);
  }
};
