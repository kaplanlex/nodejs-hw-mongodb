import contactsRouter from './routers/contacts.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import pino from 'pino-http';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.use(cors());


  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};