import { cleanEnv, num, port, str, url } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    PORT: port(),
    SESSION_SECRET: str(),
    SALT_ROUNDS: num(),
    DATABASE_URL: url()
  });
};

export default validateEnv;
