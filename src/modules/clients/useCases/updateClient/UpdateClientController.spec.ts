import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Update Client Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able update client', async () => {
    const response_city = await request(app).post('/api/cities').send({
      name: 'Wichita',
      state: 'Kansas',
    });

    const city_id = response_city.body.id;

    const client_create_response = await request(app)
      .post('/api/clients')
      .send({
        full_name: 'Rebeca Flávia Andreia Melo',
        gender: 'feminine',
        date_nasc: '2015-01-01',
        age: 6,
        city_id,
      });

    const { id } = client_create_response.body;

    const update_name = 'Rebeca Flávia Andreia De Almeida';

    const response = await request(app).patch(`/api/clients/${id}`).send({
      full_name: update_name,
    });

    expect(response.status).toBe(200);
    expect(response.body.full_name).toEqual(update_name);
  });
});
