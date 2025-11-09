import { Produto } from "../types/produtos";
import { favoritosApi } from "./api";

export async function addProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return favoritosApi
    .post("/favoritos", produto)
    .then((response) => response.data);
}
