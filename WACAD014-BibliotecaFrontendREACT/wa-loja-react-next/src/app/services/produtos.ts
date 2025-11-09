import { Produto } from "../types/produtos";
import { produtosApi } from "./api";

export async function getListaProdutos(): Promise<Produto[]> {
  return produtosApi.get("/produto").then((response) => response.data);
}
