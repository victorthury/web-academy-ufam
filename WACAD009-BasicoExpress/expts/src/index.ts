import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const server = express();
const PORT = process.env.PORT ?? 3000;

server.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

server.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
