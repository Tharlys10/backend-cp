import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Find Cities Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able list the cities', async () => {
    await request(app).post('/api/cities').send({
      name: 'Chicago',
      state: 'Illinois',
    });

    await request(app).post('/api/cities').send({
      name: 'Toledo',
      state: 'Ohio',
    });

    const response = await request(app)
      .get('/api/cities')
      .query({ limit: 10, page: 1 });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
    expect(response.body.cities[0].name).toEqual('Chicago');
  });
});
