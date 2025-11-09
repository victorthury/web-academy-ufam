import { Produto } from "../types/produtos";
import { favoritosApi } from "./api";

export async function getListaFavoritos(): Promise<Produto[]> {
  return favoritosApi.get("/favoritos").then((response) => response.data);
}
