import { Produto } from "../types/produtos";
import { produtosApi } from "./api";

export async function getProduto(produto: string): Promise<Produto> {
  return produtosApi
    .get(`/produto/${produto}`)
    .then((response) => response.data);
}
