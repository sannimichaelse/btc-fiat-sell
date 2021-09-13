import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { dbCreateConnection } from './database/dbCreateConnection';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import config from 'config'

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));
app.use('/', routes);


app.use(errorHandler);


const port = config.APP_PORT || 9002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
