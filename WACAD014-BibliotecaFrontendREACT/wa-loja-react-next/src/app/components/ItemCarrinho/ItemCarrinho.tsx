import { ItemCarrinhoType } from "@/app/types/carrinhos";
import React from "react";

interface ItemCarrinhoProps {
  itemCarrinho: ItemCarrinhoType;
  removerItemCarrinho: (id: string) => void;
}

export default function ItemCarrinho({
  itemCarrinho,
  removerItemCarrinho,
}: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <tr key={itemCarrinho.id}>
      <td>{itemCarrinho.nome}</td>
      <td>R$ {itemCarrinho.preco.toFixed(2)}</td>
      <td>{itemCarrinho.quantidade}</td>

      <td>
        R${" "}
        {valorTotalProduto(itemCarrinho.preco, itemCarrinho.quantidade).toFixed(
          2
        )}
      </td>
      <td>
        <button
          onClick={() => removerItemCarrinho(itemCarrinho.id)}
          className="btn btn-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
