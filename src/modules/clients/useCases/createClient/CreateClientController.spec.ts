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

    const response = await request(app).post('/api/clients').send({
      full_name: 'Luana Stella de Paula',
      gender: 'feminine',
      date_nasc: '1982-06-17',
      age: 39,
      city_id,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able create new client if city not exists', async () => {
    const city_id = '7d81c68c-0cc9-4056-8735-8f0db02e5e6b';

    const response = await request(app).post('/api/clients').send({
      full_name: 'Sebastião Cauê Alves',
      gender: 'masculine',
      date_nasc: '1993-10-20',
      age: 28,
      city_id,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('City not found');
  });

  it('should not be able create new client if gender incorrect', async () => {
    const city_id = '7d81c68c-0cc9-4056-8735-8f0db02e5e6b';

    const response = await request(app).post('/api/clients').send({
      full_name: 'Elias Gustavo Gael dos Santos',
      gender: 'incorrect',
      date_nasc: '2000-01-25',
      age: 21,
      city_id,
    });

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'gender not supported (masculine or feminine)'
    );
  });

  it('should not be able create new client if date of birth greater than today date', async () => {
    const city_id = '7d81c68c-0cc9-4056-8735-8f0db02e5e6b';

    const response = await request(app).post('/api/clients').send({
      full_name: 'Emanuelly Amanda da Silva',
      gender: 'feminine',
      date_nasc: '2050-08-10',
      age: 20,
      city_id,
    });

    expect(response.status).toBe(422);
    expect(response.body.message).toEqual(
      'date of birth greater than today date'
    );
  });
});
