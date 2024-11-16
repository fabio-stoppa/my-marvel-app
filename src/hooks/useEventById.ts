import {
  fetchEventById,
  fetchEventCharacters,
  fetchEventComics,
  fetchEventSeries,
  fetchEventStories,
} from "@/api/getEvents";
import { Character } from "@/types/characters";
import { Comic } from "@/types/comics";
import { Event } from "@/types/events";
import { Series } from "@/types/series";
import { Story } from "@/types/stories";
import useSWR from "swr";

interface EventsByIdData {
  event: Event;
  eventComics: Comic[];
  eventCharacters: Character[];
  eventSeries: Series[];
  eventStories: Story[];
}

const fetcher = async (id: string): Promise<EventsByIdData> => {
  const [event, eventComics, eventCharacters, eventSeries, eventStories] =
    await Promise.all([
      fetchEventById(id),
      fetchEventComics(id),
      fetchEventCharacters(id),
      fetchEventSeries(id),
      fetchEventStories(id),
    ]);

  return {
    event,
    eventComics,
    eventCharacters,
    eventSeries,
    eventStories,
  };
};

export const useEventById = (id?: string) => {
  const { data, error } = useSWR<EventsByIdData>(
    id ? `event/${id}` : null,
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
