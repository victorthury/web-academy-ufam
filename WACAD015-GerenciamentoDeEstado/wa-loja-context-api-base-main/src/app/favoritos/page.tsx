"use client";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavoritos";
import { useContext } from "react";
import { FavoritosContext } from "../State/FavoritosProvider";

export default function Favoritos() {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);

  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos
          produtosFavoritos={favoritos}
          setFavoritos={setFavoritos}
        />
      </div>
    </main>
  );
}
