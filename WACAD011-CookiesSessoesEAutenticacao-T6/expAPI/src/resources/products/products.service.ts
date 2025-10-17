import { CreateProductDTO } from './products.types';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

async function list(): Promise<Product[]> {
  const products: Product[] = await prisma.product.findMany();
  return products;
}

async function getById(id: string): Promise<Product | null> {
  const product: Product | null = await prisma.product.findFirst({
    where: { id },
  });

  return product;
}

async function nameAlreadyExists(name: string): Promise<boolean> {
  const product: Product | null = await prisma.product.findFirst({
    where: { name },
  });
  if (!product) {
    return false;
  }
  return true;
}

async function idExists(id: string): Promise<boolean> {
  const product: Product | null = await prisma.product.findFirst({
    where: { id },
  });
  if (!product) {
    return false;
  }

  return true;
}

async function create(product: CreateProductDTO): Promise<Product> {
  const createdProduct: Product = await prisma.product.create({
    data: product,
  });
  return createdProduct;
}

async function update(
  id: string,
  updatedData: CreateProductDTO,
): Promise<Product> {
  const product: Product = await prisma.product.update({
    where: { id },
    data: { ...updatedData },
  });

  return product;
}

async function remove(id: string): Promise<Product> {
  const deleteProduct: Product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return deleteProduct;
}

export default {
  list,
  getById,
  create,
  update,
  remove,
  nameAlreadyExists,
  idExists,
};
