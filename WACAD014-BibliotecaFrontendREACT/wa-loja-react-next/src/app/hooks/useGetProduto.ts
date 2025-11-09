import { useQuery } from "@tanstack/react-query";
import { getProduto } from "../services/produto";

export function useGetProduto(produto: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["listaProduto"],
    queryFn: () => getProduto(produto),
  });

  return { produto: data, isPending, isError };
}
