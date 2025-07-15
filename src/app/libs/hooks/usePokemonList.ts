import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../api";

export function usePokemonList(page: number, search: string) {
  return useQuery({
    queryKey: ["pokemon", "list", page, search],
    queryFn: () => getPokemonList(page, search),
    placeholderData: keepPreviousData,
  });
}
