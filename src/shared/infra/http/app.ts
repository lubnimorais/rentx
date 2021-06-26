import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import '@shared/container';

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';
import createConnection from '../typeorm';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
