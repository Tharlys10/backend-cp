import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Find Clients Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able list clients', async () => {
    const response_city = await request(app).post('/api/cities').send({
      name: 'St. Louis',
      state: 'Missouri',
    });

    const city_id = response_city.body.id;

    await request(app).post('/api/clients').send({
      full_name: 'Pietra Marcela da Luz',
      gender: 'feminine',
      date_nasc: '2002-05-20',
      age: 19,
      city_id,
    });

    await request(app).post('/api/clients').send({
      full_name: 'Priscila Rosa Ramos',
      gender: 'feminine',
      date_nasc: '2005-03-16',
      age: 16,
      city_id,
    });

    const response = await request(app)
      .get('/api/clients')
      .query({ limit: 10, page: 1 });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
  });
});
