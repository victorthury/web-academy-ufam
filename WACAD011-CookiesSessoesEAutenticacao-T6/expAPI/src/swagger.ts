import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const doc = {
  info: {
    title: 'API da Loja virtual',
    description: 'Documentação da API'
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProductDTO: {
      name: 'Mesa',
      price: 200.89,
      stock: 10
    },
    Product: {
      id: 'efde3166-8e8a-4240-a761-c4dbe80a9215',
      name: 'Mesa',
      price: 200.89,
      stock: 10,
      createdAt: '2025-10-25T14:09:10.030Z',
      updatedAt: '2025-10-25T14:09:10.030Z'
    },
    CreateUserDTO: {
      id: 'b68d8481-0015-42ec-a743-d24f73221150',
      name: 'Mrs. Faye Parisian',
      email: 'Gracie64@gmail.com',
      password: '$2b$10$E1RZ1Y3abUcJdIbAR6wYSuuhFrJU1Rt.Pf5h2mChoP.e.qdrSSmQ2',
      userTypeId: '2588d064-6935-451d-b31a-2523b97d26fd',
      createdAt: '2025-10-25T14:09:10.030Z',
      updatedAt: '2025-10-25T14:09:10.030Z'
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/index.ts'];

swaggerAutogen()(outputFile, routes, doc);
