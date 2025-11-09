"use client";

import React, { createContext, useState } from "react";

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

export default FavoritosProvider;
