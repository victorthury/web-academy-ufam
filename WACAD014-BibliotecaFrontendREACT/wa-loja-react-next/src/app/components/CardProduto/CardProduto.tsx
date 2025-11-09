import { useAddFavorito } from "@/app/hooks/useAddFavorito";
import { Produto } from "@/app/types/produtos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CardProdutoProps {
  produto: Produto;
  addCarrinho: (produto: Produto) => void;
}

export default function CardProduto({
  produto,
  addCarrinho,
}: CardProdutoProps) {
  const { isPending, addFavorito } = useAddFavorito(
    () => toast.success("Produto favoritado com sucesso!"),
    () => toast.error("Algo deu errado")
  );

  const router = useRouter();

  const verDetalhesProduto = (nomeDoProduto: string) => {
    router.push(`/produto/${nomeDoProduto}`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.nome}
          width={300}
          height={320}
          onClick={() => verDetalhesProduto(produto.nome)}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button
            onClick={() => addCarrinho(produto)}
            className="btn btn-dark d-block w-100 mb-2"
            type="button"
          >
            Adicionar no carrinho
          </button>
          <button
            onClick={() => addFavorito(produto)}
            className="btn btn-secondary d-block w-100"
            type="button"
          >
            {isPending ? "Favoritando" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
