import useSWR from "swr";
import {
  fetchCharacterById,
  fetchCharacterComics,
  fetchCharacterEvents,
  fetchCharacterSeries,
  fetchCharacterStories,
} from "@/api/getCharacters";
import { Character } from "@/types/characters";
import { Comic } from "@/types/comics";
import { Event } from "@/types/events";
import { Series } from "@/types/series";
import { Story } from "@/types/stories";

interface CharacterByIdData {
  character: Character;
  charComics: Comic[];
  charEvents: Event[];
  charSeries: Series[];
  charStories: Story[];
}

const fetcher = async (id: string) => {
  const [character, charComics, charEvents, charSeries, charStories] =
    await Promise.all([
      fetchCharacterById(id),
      fetchCharacterComics(id),
      fetchCharacterEvents(id),
      fetchCharacterSeries(id),
      fetchCharacterStories(id),
    ]);

  return {
    character,
    charComics,
    charEvents,
    charSeries,
    charStories,
  };
};

export const useCharacterById = (id?: string) => {
  const { data, error } = useSWR<CharacterByIdData>(
    id ? `character/${id}` : null,
    () => fetcher(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      revalidateIfStale: false,
      dedupingInterval: 2000,
    }
  );

  const loading = !data && !error;

  return { data, loading, error };
};
