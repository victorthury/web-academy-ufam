import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import cookieParser from 'cookie-parser';
import createLanguageCookie from './middlewares/createLanguageCookie';
import session from 'express-session';
import { v4 as uuidV4 } from 'uuid';
import createCart from './middlewares/createCart';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';

dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 4000;
const NODE_ENV = process.env.NODE_ENV ?? 'development';

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(createLanguageCookie());
server.use(
  session({
    genid: () => uuidV4(),
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true
  })
);

if (NODE_ENV === 'development') {
  server.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

server.use(createCart());

server.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
