import React from "react";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produtos";

interface ListagemProdutosProps {
  produtos: Produto[];
  addCarrinho: (produto: Produto) => void;
}

export default function ListagemProduto({
  produtos,
  addCarrinho,
}: ListagemProdutosProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            addCarrinho={addCarrinho}
          />
        ))}
      </div>
    </>
  );
}
