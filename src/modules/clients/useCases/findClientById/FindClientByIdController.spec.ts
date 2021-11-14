import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Find Client By Id Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able search client by id', async () => {
    const response_city = await request(app).post('/api/cities').send({
      name: 'St. Louis',
      state: 'Missouri',
    });

    const city_id = response_city.body.id;

    const client_create_response = await request(app)
      .post('/api/clients')
      .send({
        full_name: 'Raimunda Ana Juliana Ribeiro',
        gender: 'feminine',
        date_nasc: '1982-06-17',
        age: 39,
        city_id,
      });

    const { id } = client_create_response.body;

    const response = await request(app).get(`/api/clients/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(id);
  });

  it('should not be able search client by id not found', async () => {
    const id = 'cccd47d9-5384-4232-96ba-50b74a6d5725';

    const response = await request(app).get(`/api/clients/${id}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Client not found');
  });
});
