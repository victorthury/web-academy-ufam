import { CreateProductDTO, Product } from './products.types';

const products: Product[] = [];

function list() {
  return products;
}

function get(id: number) {
  return products.find((product) => product.id === id);
}

function create(product: CreateProductDTO) {
  const productCreate = { id: products.length, ...product };
  products.push(productCreate);
  return productCreate;
}

function update(id: number, updatedData: CreateProductDTO) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1 || !products[index]) {
    return null;
  }

  products[index] = { id: products[index].id, ...updatedData };
  return products[index];
}

function remove(id: number) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}

export default { list, get, create, update, remove };
