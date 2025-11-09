import { Produto } from "../types/produtos";
import { favoritosApi } from "./api";

export async function deleteProdutoFavorito(produto: Produto) {
  return favoritosApi
    .delete(`/favoritos/${produto.id}`)
    .then((respose) => respose.data);
}
