import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from './middlewares/logger';
import router from './routers/router';
import { engine } from 'express-handlebars';

dotenv.config();
validateEnv();

const server = express();
const PORT = process.env.PORT ?? 3000;
const LOG_DIR = process.env.LOG_DIR ?? 'log';

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/views`);

server.use(logger('completo', LOG_DIR));

server.use(router);

server.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
