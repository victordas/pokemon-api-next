import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../api";

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemon", "details", name],
    queryFn: () => getPokemonDetails(name),
    enabled: !!name,
  });
}
