"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "../helpers";

interface IFavoritosContext {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritosContext = createContext<IFavoritosContext>({
  favoritos: [],
  setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  useEffect(() => {
    const favoritosLocalStorage = localStorage.getItem("favoritos");

    if (favoritosLocalStorage) {
      setFavoritos(JSON.parse(favoritosLocalStorage));
    }
  }, []);

  const values = {
    favoritos,
    setFavoritos,
  };

  return (
    <FavoritosContext.Provider value={values}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);
  return favoritosContext;
};

export const useProdutoFavorito = (id: string) => {
  const { favoritos } = useContext(FavoritosContext);

  const produtoFavorito = favoritos.some((item) => item.id === id);

  return produtoFavorito;
};

export const useRemoveProdutoFavorito = () => {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);

  return (id: string) => {
    const produtosFavoritos = favoritos.filter((item) => item.id !== id);
    setFavoritos(produtosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(produtosFavoritos));
  };
};

export const useAddProdutoFavorito = () => {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);
  return (produto: Produto) => {
    const novosFavoritos = [...favoritos, produto];
    setFavoritos(novosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify([...favoritos, produto]));
  };
};

export const useValorTotalFavoritos = () => {
  const { favoritos } = useContext(FavoritosContext);
  return favoritos.reduce((acc, produto) => {
    return (
      acc +
      calculaValorComPorcentagemDeDesconto(
        Number(produto.preco),
        produto.desconto
      )
    );
  }, 0);
};

export default FavoritosProvider;
