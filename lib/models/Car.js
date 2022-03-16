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

  static async updateById(id, { make, model }) {
    const existingCar = await Car.getById(id);
    if (!existingCar) return null;

    const newMake = make ?? existingCar.make;
    const newModel = model ?? existingCar.model;
    const { rows } = await pool.query(
      'UPDATE cars SET make=$1, model=$2 WHERE id=$3 RETURNING *;',
      [newMake, newModel, id]
    );
    return new Car(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Car(rows[0]);
  }
};
