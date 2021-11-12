import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create City Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new city', async () => {
    const response = await request(app).post('/api/cities').send({
      name: 'Toledo',
      state: 'Ohio',
    });

    expect(response.status).toBe(201);
  });

  it('should not be possible to register if the city already exists in this state', async () => {
    await request(app).post('/api/cities').send({
      name: 'Chicago',
      state: 'Illinois',
    });

    const response = await request(app).post('/api/cities').send({
      name: 'Chicago',
      state: 'Illinois',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('City already exists in this state');
  });
});
