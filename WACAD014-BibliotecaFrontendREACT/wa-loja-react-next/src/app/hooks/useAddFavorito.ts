import { useMutation } from "@tanstack/react-query";
import { Produto } from "../types/produtos";
import { addProdutoFavorito } from "../services/favoritar";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => addProdutoFavorito(produto),
    onSuccess,
    onError,
  });

  return {
    addFavorito: mutate,
    isPending,
  };
}
