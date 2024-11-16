import { Filter } from "@/hooks/useCharacters";
import { Character, CharacterResponse } from "@/types/characters";
import { Comic, ComicResponse } from "@/types/comics";
import { Event, EventResponse } from "@/types/events";
import { Series, SeriesResponse } from "@/types/series";
import { Story, StoryResponse } from "@/types/stories";
import { getCharacters } from "./getCharacters";
import { getComics } from "./getComics";
import { getSeries } from "./getSeries";
import { generateAuthParams, marvelApi } from "./marvelApi";

export const getEvents = async ({
  offset,
  limit,
  filter,
}: {
  offset: number;
  limit: number;
  filter?: Filter;
}): Promise<{
  events: Event[];
  total: number;
}> => {
  try {
    let convertedFilter;
    if (filter && filter.type === "events") {
      convertedFilter = filter.text;
    }

    if (filter && filter.type === "characters") {
      const eventsResponse = await getCharacters({
        filter: filter,
        offset: 0,
        limit: 100,
      });

      const charIdsArr = eventsResponse.characters
        .slice(0, 9)
        .map((comic: { id: number }) => comic.id);

      if (charIdsArr.length > 0) {
        convertedFilter = charIdsArr.join(",");
      } else {
        return {
          events: [],
          total: 0,
        };
      }
    }

    if (filter && filter.type === "comics") {
      const comicsResponse = await getComics({
        nameStartsWith: filter.text,
        offset: 0,
        limit: 100,
      });
      const comicIdsArr = comicsResponse.data.results
        .slice(0, 9)
        .map((comic: { id: number }) => comic.id);

      if (comicIdsArr.length > 0) {
        convertedFilter = comicIdsArr.join(",");
      } else {
        return {
          events: [],
          total: 0,
        };
      }
    }

    if (filter && filter.type === "series") {
      const seriesResponse = await getSeries({
        nameStartsWith: filter.text,
        offset: 0,
        limit: 100,
      });
      const seriesIdsArr = seriesResponse.data.results
        .slice(0, 9)
        .map((series: { id: number }) => series.id);

      if (seriesIdsArr.length > 0) {
        convertedFilter = seriesIdsArr.join(",");
      } else {
        return {
          events: [],
          total: 0,
        };
      }
    }

    const params = {
      ...generateAuthParams(),
      offset,
      limit,
      nameStartsWith:
        filter && filter.type === "events" && filter.text
          ? convertedFilter
          : undefined,
      characters:
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
    };

    const response = await marvelApi.get<EventResponse>("events", { params });

    return {
      events: response.data.data.results,
      total: response.data.data.total,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<EventResponse>(`events/${id}`, {
      params,
    });

    return response.data.data.results[0];
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const fetchEventCharacters = async (
  id: string
): Promise<Character[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<CharacterResponse>(
      `events/${id}/characters`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching event characters:", error);
    throw error;
  }
};

export const fetchEventComics = async (id: string): Promise<Comic[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<ComicResponse>(`events/${id}/comics`, {
      params,
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching event series:", error);
    throw error;
  }
};

export const fetchEventStories = async (id: string): Promise<Story[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<StoryResponse>(
      `events/${id}/stories`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching event stories:", error);
    throw error;
  }
};

export const fetchEventSeries = async (id: string): Promise<Series[]> => {
  const params = generateAuthParams();

  try {
    const response = await marvelApi.get<SeriesResponse>(
      `events/${id}/series`,
      {
        params,
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching event series:", error);
    throw error;
  }
};
