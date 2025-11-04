"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho.tsx/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import { ItemCarrinhoType } from "../types/carrinhos";

export default function Carrinho() {
  const [mockItensCarrinhoState, setMockItensCarrinhoState] =
    React.useState<ItemCarrinhoType[]>(mockItensCarrinho);

  const removerItemCarrinho = (id: string): void => {
    console.log(id);
    setMockItensCarrinhoState((itensAnteriores) =>
      itensAnteriores.filter((item) => item.id !== id)
    );
  };

  const quantidadeTotalCalculada = mockItensCarrinhoState.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  const valorTotal = mockItensCarrinhoState.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho
            itensCarrinho={mockItensCarrinhoState}
            removerItemCarrinho={removerItemCarrinho}
          />
          <ResumoCarrinho
            quantidadeTotal={quantidadeTotalCalculada}
            valorTotal={valorTotal}
          />
        </div>
      </main>
    </>
  );
}
