const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a car', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Nissan', model: 'GT-R' });

    expect(res.body).toEqual({
      id: expect.any(String),
      make: 'Nissan',
      model: 'GT-R',
    });
  });

  it('should be able to list all cars', async () => {
    await Car.insert({ make: 'Nissan', model: 'GT-R' });
    const res = await request(app).get('/api/v1/cars');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        make: 'Nissan',
        model: 'GT-R',
      },
    ]);
  });

  it('should be able to list a car by id', async () => {
    const car = await Car.insert({ make: 'Nissan', model: 'GT-R' });
    const res = await request(app).get(`/api/v1/cars/${car.id}`);

    expect(res.body).toEqual(car);
  });

  it('should be able to update a car by id', async () => {
    const car = await Car.insert({ make: 'Nissan', model: 'GT-R' });
    const res = await request(app)
      .patch(`/api/v1/cars/${car.id}`)
      .send({ make: 'Ferrari', model: '458 Italia' });

    const expected = {
      id: expect.any(String),
      make: 'Ferrari',
      model: '458 Italia',
    };

    expect(res.body).toEqual(expected);
    expect(await Car.getById(car.id)).toEqual(expected);
  });
});
