import { useDeleteFavorito } from "@/app/hooks/useDeleteFavorito";
import { Produto } from "@/app/types/produtos";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProdutoFavoritoProps {
  produtoFavorito: Produto;
}

export default function ProdutoFavorito({
  produtoFavorito,
}: ProdutoFavoritoProps) {
  const queryClient = useQueryClient();

  const { isPending, deleteFavorito } = useDeleteFavorito(
    () => {
      toast.success("Produto desfavoritado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
    },
    () => toast.error("Algo deu errado")
  );

  return (
    <tr key={produtoFavorito.id}>
      <td>{produtoFavorito.nome}</td>
      <td>R$ {parseInt(produtoFavorito.preco).toFixed(2)}</td>
      <td>
        <button
          onClick={() => deleteFavorito(produtoFavorito)}
          className="btn btn-danger btn-sm"
        >
          {isPending ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
}
