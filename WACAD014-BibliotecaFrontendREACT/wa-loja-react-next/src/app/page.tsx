"use client";
import React from "react";
import ListagemProduto from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho.tsx/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";
import { Produto } from "./types/produtos";

export default function Produtos() {
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<number>(0);
  const [valorTotal, setValorTotal] = React.useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto): void => {
    setQuantidadeTotal(
      (quantidadeTotalAnterior) => quantidadeTotalAnterior + 1
    );
    setValorTotal(valorTotal + parseInt(produto.preco));
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho
            quantidadeTotal={quantidadeTotal}
            valorTotal={valorTotal}
          />
          <ListagemProduto
            produtos={mockProdutos}
            addCarrinho={adicionarAoCarrinho}
          />
        </div>
      </main>
    </>
  );
}
