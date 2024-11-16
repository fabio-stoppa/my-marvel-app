import { marvelApi, generateAuthParams } from "./marvelApi";
import { Character, MarvelResponse } from "@/types/marvel";
import { Filter } from "@/hooks/useCharacters";

export const getCharacters = async ({
  offset,
  limit,
  filter,
}: {
  offset: number;
  limit: number;
  filter?: Filter;
}): Promise<{
  characters: Character[];
  total: number;
}> => {
  let convertedFilter = filter;
  if (filter && filter.text === "") convertedFilter = undefined;

  const params = {
    ...generateAuthParams(),
    offset,
    limit,
    nameStartsWith:
      filter && filter.type === "character" ? convertedFilter?.text : undefined,
    comics:
      filter && filter.type === "comics" ? convertedFilter?.text : undefined,
    stories:
      filter && filter.type === "stories" ? convertedFilter?.text : undefined,
    series:
      filter && filter.type === "series" ? convertedFilter?.text : undefined,
    events:
      filter && filter.type === "events" ? convertedFilter?.text : undefined,
  };

  try {
    const response = await marvelApi.get<MarvelResponse>("characters", {
      params,
    });
    return {
      characters: response.data.data.results,
      total: response.data.data.total,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<MarvelResponse>(`characters/${id}`, {
      params,
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
