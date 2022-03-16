const { Router } = require('express');
const Car = require('../models/Car');
// const pool = require('..utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.json(car);
  })

  .get('/', async (req, res) => {
    const cars = await Car.getAll(req.body);
    res.json(cars);
  })

  .get('/:id', async (req, res) => {
    const car = await Car.getById(req.params.id);
    res.json(car);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedCar = await Car.updateById(id, req.body);

      if (!updatedCar) {
        const error = new Error(`Car ${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json(updatedCar);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const car = await Car.deleteById(req.params.id);
    res.json(car);
  });
