import cors from 'cors';
import express from 'express';
import routesList from 'express-routes-catalogue';
import helmet from 'helmet';
import morgan from 'morgan';

import acronymsAPI from 'api/acronyms';
import miscAPI from 'api/misc';
import { ResponseError } from 'helpers/errors';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API
app.use('/acronym', acronymsAPI);
app.use('/', miscAPI);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, _req, res, _next) => {
  if (error instanceof ResponseError) {
    if (error.originalError) {
      console.error(error.originalError);
    }
    res.status(error.statusCode);
    res.send({ message: error.message });
  } else {
    console.error(error);
    res.status(500);
    res.send({ message: 'Internal server error.' });
  }
});

function listen(port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject);
  });
}

async function startServer() {
  try {
    await listen(3000);
    console.log('Server listening at 127.0.0.1:3000');
    routesList.terminal(app);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  console.error(error);
});
process.on('unhandledRejection', (error) => {
  console.error(error);
});

startServer();
