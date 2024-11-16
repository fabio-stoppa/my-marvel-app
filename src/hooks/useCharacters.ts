import useSWRInfinite from "swr/infinite";
import { getCharacters } from "@/api/getCharacters";
import { Character } from "@/types/characters";

export interface Filter {
  text: string;
  type: "characters" | "comics" | "series" | "events";
}

export const PAGE_SIZE = 24;

export const useCharacters = (filter?: Filter) => {
  return useSWRInfinite<{ characters: Character[]; total: number }, Error>(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.characters.length) return null;

      return {
        offset: index * PAGE_SIZE,
        limit: PAGE_SIZE,
        filter,
      };
    },
    getCharacters,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
      keepPreviousData: true,
      dedupingInterval: 2000,
    }
  );
};
