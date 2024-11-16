import { Filter } from "@/hooks/useCharacters";
import { Character, CharacterResponse } from "@/types/characters";
import { getComics } from "./getComics";
import { getEvents } from "./getEvents";
import { getSeries } from "./getSeries";
import { generateAuthParams, marvelApi } from "./marvelApi";

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
  try {
    let convertedFilter;
    if (filter && filter.type === "character") {
      convertedFilter = filter.text;
    }
    if (filter && filter.type === "comics") {
      const comicsResponse = await getComics(filter.text);
      const comicIdsArr = comicsResponse.data.results
        .slice(0, 9)
        .map((comic: { id: number }) => comic.id);
      if (comicIdsArr.length > 0) {
        convertedFilter = comicIdsArr.join(",");
      } else {
        return {
          characters: [],
          total: 0,
        };
      }
    }
    if (filter && filter.type === "series") {
      const seriesResponse = await getSeries(filter.text);
      const seriesIdsArr = seriesResponse.data.results
        .slice(0, 9)
        .map((comic: { id: number }) => comic.id);
      if (seriesIdsArr.length > 0) {
        convertedFilter = seriesIdsArr.join(",");
      } else {
        return {
          characters: [],
          total: 0,
        };
      }
    }
    if (filter && filter.type === "events") {
      const eventsReponse = await getEvents(filter.text);
      const eventsIdsArr = eventsReponse.data.results
        .slice(0, 9)
        .map((comic: { id: number }) => comic.id);
      if (eventsIdsArr.length > 0) {
        convertedFilter = eventsIdsArr.join(",");
      } else {
        return {
          characters: [],
          total: 0,
        };
      }
    }

    const params = {
      ...generateAuthParams(),
      offset,
      limit,
      nameStartsWith:
        filter && filter.type === "character" && filter.text
          ? convertedFilter
          : undefined,
      comics:
        filter && filter.type === "comics" && filter.text
          ? convertedFilter
          : undefined,
      series:
        filter && filter.type === "series" && filter.text
          ? convertedFilter
          : undefined,
      events:
        filter && filter.type === "events" && filter.text
          ? convertedFilter
          : undefined,
    };

    const response = await marvelApi.get<CharacterResponse>("characters", {
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
    const response = await marvelApi.get<CharacterResponse>(
      `characters/${id}`,
      {
        params,
      }
    );
    return response.data.data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
