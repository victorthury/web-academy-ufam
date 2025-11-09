import { useQuery } from "@tanstack/react-query";
import { getListaFavoritos } from "../services/favoritos";

export function useListaFavoritos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: () => getListaFavoritos(),
  });

  return { favoritos: data, isPending, isError };
}
