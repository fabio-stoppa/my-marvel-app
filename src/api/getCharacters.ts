import { Filter } from "@/hooks/useCharacters";
import { Character, CharacterResponse } from "@/types/characters";
import { getComics } from "./getComics";
import { getEvents } from "./getEvents";
import { getSeries } from "./getSeries";
import { generateAuthParams, marvelApi } from "./marvelApi";
import { Comic, ComicResponse } from "@/types/comics";
import { Event, EventResponse } from "@/types/events";
import { Story, StoryResponse } from "@/types/stories";
import { Series, SeriesResponse } from "@/types/series";

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
    if (filter && filter.type === "characters") {
      convertedFilter = filter.text;
    }
    if (filter && filter.type === "comics") {
      const comicsResponse = await getComics({
        nameStartsWith: filter.text,
        offset: 0,
        limit: 30,
      });
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
      const seriesResponse = await getSeries({
        nameStartsWith: filter.text,
        offset: 0,
        limit: 30,
      });
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
      const eventsResponse = await getEvents({
        filter: filter,
        offset: 0,
        limit: 30,
      });
      const eventsIdsArr = eventsResponse.events
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
        filter && filter.type === "characters" && filter.text
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
    console.error("Error fetching characters:", error);
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
    console.error("Error fetching character:", error);
    throw error;
  }
};

export const fetchCharacterComics = async (id: string): Promise<Comic[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<ComicResponse>(
      `characters/${id}/comics`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching character comics:", error);
    throw error;
  }
};

export const fetchCharacterEvents = async (id: string): Promise<Event[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<EventResponse>(
      `characters/${id}/events`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching character events:", error);
    throw error;
  }
};

export const fetchCharacterStories = async (id: string): Promise<Story[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<StoryResponse>(
      `characters/${id}/stories`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching character events:", error);
    throw error;
  }
};

export const fetchCharacterSeries = async (id: string): Promise<Series[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<SeriesResponse>(
      `characters/${id}/series`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching character events:", error);
    throw error;
  }
};
