import request from 'supertest';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Delete Client Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able delete client', async () => {
    const response_city = await request(app).post('/api/cities').send({
      name: 'San Jose',
      state: 'California',
    });

    const city_id = response_city.body.id;

    const client_create_response = await request(app)
      .post('/api/clients')
      .send({
        full_name: 'Flávia Vitória Mariana Assis',
        gender: 'feminine',
        date_nasc: '1982-05-25',
        age: 39,
        city_id,
      });

    const { id } = client_create_response.body;

    const response = await request(app).delete(`/api/clients/${id}`);

    expect(response.status).toBe(200);
  });
});
