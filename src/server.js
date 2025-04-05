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
    })
  );

  app.use('/api/contacts', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  return app;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = setupServer();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
