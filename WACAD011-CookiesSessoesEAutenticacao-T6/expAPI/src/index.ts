import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 4000;

const server = express();

server.use(express.json());
server.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
