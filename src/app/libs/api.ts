import { EvolutionTrigger, Pokemon, PokemonDetails } from "../types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(page = 1, search = "") {
  const ITEMS_PER_PAGE = 20;

  if (search) {
    const response = await fetch(
      `${API_BASE_URL}/pokemon/${search.toLowerCase()}`
    );
    if (!response.ok) throw new Error("Pokemon not found");
    const pokemon = await response.json();
    return {
      pokemon: [
        {
          name: pokemon.name,
          url: `${API_BASE_URL}/pokemon/${pokemon.id}/`,
        },
      ],
      totalPages: 1,
    };
  }

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
  );
  if (!response.ok) throw new Error("Failed to fetch Pokemon list");
  const data = await response.json();

  return {
    pokemon: data.results as Pokemon[],
    totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
  };
}

export async function getPokemonDetails(name: string) {
  const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon details");
  return response.json() as Promise<PokemonDetails>;
}

export async function getEvolutionTriggers(page = 1) {
  const ITEMS_PER_PAGE = 10;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const response = await fetch(
    `${API_BASE_URL}/evolution-trigger?limit=${ITEMS_PER_PAGE}&offset=${offset}`
  );
  if (!response.ok) throw new Error("Failed to fetch evolution triggers");
  const data = await response.json();

  return {
    triggers: data.results as EvolutionTrigger[],
    totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
  };
}
