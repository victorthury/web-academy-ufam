import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";
import ProdutoFavorito from "../ProdutoFavorito/ProdutoFavorito";

export default function ListagemFavoritos() {
  const { favoritos, isPending, isError } = useListaFavoritos();

  if (isPending) return <h5>Carregando...</h5>;

  if (isError) return <h5>Ocorreu um erro ao carregar os favoritos.</h5>;

  if (!favoritos) return <h5>Não há produtos disponíveis no momento.</h5>;

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos favoritos</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((item) => (
                <ProdutoFavorito key={item.id} produtoFavorito={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
