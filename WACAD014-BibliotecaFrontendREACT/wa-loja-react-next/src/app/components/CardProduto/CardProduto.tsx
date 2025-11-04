import { Produto } from "@/app/types/produtos";
import Image from "next/image";
import React from "react";

interface CardProdutoProps {
  produto: Produto;
  addCarrinho: (produto: Produto) => void;
}

export default function CardProduto({
  produto,
  addCarrinho,
}: CardProdutoProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.nome}
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button
            onClick={() => addCarrinho(produto)}
            className="btn btn-dark d-block w-100"
            type="button"
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
