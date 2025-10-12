import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from './middlewares/logger';
import router from './routers/router';
import { engine } from 'express-handlebars';
import helpers from './views/helpers/helpers';
import productsRouter from './routers/products';

dotenv.config();
validateEnv();

const server = express();
const PORT = process.env.PORT ?? 3000;
const LOG_DIR = process.env.LOG_DIR ?? 'log';

server.engine(
  'handlebars',
  engine({
    helpers,
    layoutsDir: `${__dirname}/views/layouts`,
  }),
);
server.set('view engine', 'handlebars');
server.set('views', `${__dirname}/views`);

server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));

server.use(logger('completo', LOG_DIR));

server.use(router);
server.use(productsRouter);

server.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
