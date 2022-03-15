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
  });
