import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { mockProdutos } from "@/app/mocks/produtos";
import { FavoritosProvider } from "@/app/State/FavoritosProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemFavorito from "../ItemFavorito";

jest.mock("../../../State/FavoritosProvider.tsx", () => ({
  ...jest.requireActual("../../../State/FavoritosProvider.tsx"),
  useProdutoFavorito: jest.fn(),
}));

describe("ItemFavorito", () => {
  it("deve renderizar corretamente as informações do produto favoritado", () => {
    const produtoMockado = mockProdutos[0];
    const { nome, preco, fotos, desconto } = produtoMockado;

    const precoComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(produtoMockado.preco),
      produtoMockado.desconto
    );

    render(
      <FavoritosProvider>
        <ItemFavorito itemFavorito={produtoMockado} setFavoritos={() => {}} />
      </FavoritosProvider>
    );

    expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
    expect(screen.getByText(nome)).toBeInTheDocument();
    expect(
      screen.getByText(`R$ ${precoComDesconto.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
  });

  it("deve ser possível clicar no botão remover", async () => {
    const setFavoritos = jest.fn();
    const produtoMockado = mockProdutos[0];

    render(
      <FavoritosProvider>
        <ItemFavorito
          itemFavorito={produtoMockado}
          setFavoritos={setFavoritos}
        />
      </FavoritosProvider>
    );

    const botao = screen.getByRole("button", {
      name: /Remover/i,
    });

    await userEvent.click(botao);

    expect(setFavoritos).toHaveBeenCalled();
  });
});
