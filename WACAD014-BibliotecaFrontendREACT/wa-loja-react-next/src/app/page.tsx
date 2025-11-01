"use client";
import React from "react";
import ListagemProduto from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho.tsx/ResumoCarrinho";

export default function Produtos() {
  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <ListagemProduto />
        </div>
      </main>
    </>
  );
}
