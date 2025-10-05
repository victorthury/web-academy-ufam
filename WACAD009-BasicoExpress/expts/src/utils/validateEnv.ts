import { cleanEnv, port, str } from 'envalid';
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    PORT: port(),
  });
};
export default validateEnv;
