"use client";

import { useGetProduto } from "@/app/hooks/useGetProduto";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Produto() {
  const params = useParams();
  const produtoId = params.produto as string;

  const { produto, isPending, isError } = useGetProduto(produtoId);

  console.log(isPending);

  if (isPending) {
    console.log("isPending");
    return <h5>Carregando...</h5>;
  }

  if (isError) return <h5>Ocorreu um erro ao carregar o produto.</h5>;

  if (!produto) return <h5>Produto não disponível no momento.</h5>;

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              <Image
                key={produto.id}
                src={produto.fotos[0].src}
                alt={produto.nome}
                width={300}
                height={320}
              />
            </div>

            <p className="card-text fw-medium">
              Valor: R${Number(parseInt(produto.preco)).toFixed(2)}
            </p>
            <p className="card-text fw-medium">
              Descrição: {produto.descricao}
            </p>
            <p className="card-text fw-medium">
              Anunciado por: {produto.usuario_id}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
