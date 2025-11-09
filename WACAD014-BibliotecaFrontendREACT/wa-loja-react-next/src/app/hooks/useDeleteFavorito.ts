import { useMutation } from "@tanstack/react-query";
import { Produto } from "../types/produtos";
import { deleteProdutoFavorito } from "../services/desfavoritar";

export function useDeleteFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => deleteProdutoFavorito(produto),
    onSuccess,
    onError,
  });
  return {
    deleteFavorito: mutate,
    isPending,
  };
}
