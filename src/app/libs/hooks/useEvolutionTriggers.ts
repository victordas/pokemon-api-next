import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEvolutionTriggers } from "../api";

export function useEvolutionTriggers(page: number) {
  return useQuery({
    queryKey: ["evolution", "triggers", page],
    queryFn: () => getEvolutionTriggers(page),
    placeholderData: keepPreviousData,
  });
}
