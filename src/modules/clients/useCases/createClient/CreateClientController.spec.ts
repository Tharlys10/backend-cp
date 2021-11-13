import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create Client Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able create new client', async () => {
    const response_city = await request(app).post('/api/cities').send({
      name: 'St. Louis',
      state: 'Missouri',
    });

    const city_id = response_city.body.id;

    const response = await request(app)
      .post('/api/clients')
      .send({
        full_name: 'Fernanda Alícia Costa',
        gender: 'masculine',
        date_nasc: new Date('1980-01-23'),
        age: 41,
        city_id,
      });

    expect(response.status).toBe(201);
  });
});
