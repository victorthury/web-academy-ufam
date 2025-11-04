type Fotos = {
  titulo: string;
  src: string;
};

export type Produto = {
  id: string;
  fotos: Fotos[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
};
