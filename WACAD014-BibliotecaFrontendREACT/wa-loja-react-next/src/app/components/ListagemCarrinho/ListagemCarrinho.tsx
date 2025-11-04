import React from "react";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";
import { ItemCarrinhoType } from "@/app/types/carrinhos";

interface ListagemCarrinhoProps {
  itensCarrinho: ItemCarrinhoType[];
  removerItemCarrinho: (id: string) => void;
}

export default function ListagemCarrinho({
  itensCarrinho,
  removerItemCarrinho,
}: ListagemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.map((item) => (
                <ItemCarrinho
                  key={item.id}
                  itemCarrinho={item}
                  removerItemCarrinho={removerItemCarrinho}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
