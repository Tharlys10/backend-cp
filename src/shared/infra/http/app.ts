import 'reflect-metadata';
import 'dotenv/config';
import swaggerFile from '@docs/swagger.json';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import { router } from './routes';

// createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', router);

// errors
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status_code).json({
        status_code: err.status_code,
        message: err.message,
      });
    }

    return response.status(500).json({
      status_code: 500,
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
