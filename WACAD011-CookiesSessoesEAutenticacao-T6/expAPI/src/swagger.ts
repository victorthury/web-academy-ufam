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
      email: 'admin@gmail.com',
      name: 'admin',
      password: 'minhasenha',
      userTypeId: 'a87fd6d5-80d5-47ea-88c7-098cb4eb05e7'
    },
    User: {
      id: '31ac9126-451d-49dc-8a38-40707eb36f15',
      name: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$10$S67DsZZtmCJwxtx/3NT0l.mOUYjIX0yUUPzKFnOrkO63V1jjrQF3G',
      userTypeId: 'a87fd6d5-80d5-47ea-88c7-098cb4eb05e7',
      createdAt: '2025-11-02T13:14:39.354Z',
      updatedAt: '2025-11-02T13:14:39.354Z'
    },
    SignUp: {
      name: 'Cliente',
      email: 'cliente@gmail.com',
      password: 'minhasenha'
    },
    SignUpUser: {
      id: 'ea4bcee3-64d1-4b0c-a853-e8c764629325',
      name: 'Cliente',
      email: 'cliente@gmail.com',
      password: '$2b$10$tiJ.rw/P1o0r9M1UXHuz/.NrbSwJ4RRbnZOCH7uPIGvaoYZRnKIgy',
      userTypeId: '2588d064-6935-451d-b31a-2523b97d26fd',
      createdAt: '2025-11-02T13:09:54.857Z',
      updatedAt: '2025-11-02T13:09:54.857Z'
    },
    Login: {
      email: 'kleber_admin@gmail.com',
      password: 'minhasenha'
    },
    AddPurchaseItemDTO: {
      productId: 'caf2117f-a51b-452a-ace4-d86d06a0e1d3',
      quantity: 8
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/index.ts'];

swaggerAutogen()(outputFile, routes, doc);
