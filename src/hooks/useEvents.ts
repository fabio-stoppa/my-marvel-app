import { getEvents } from "@/api/getEvents";
import { Event } from "@/types/events";
import useSWRInfinite from "swr/infinite";
import { Filter } from "./useCharacters";

export const PAGE_SIZE = 24;

export const useEvents = (filter?: Filter) => {
  return useSWRInfinite<{ events: Event[]; total: number }, Error>(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.events.length) return null;

      return {
        offset: index * PAGE_SIZE,
        limit: PAGE_SIZE,
        filter,
      };
    },
    getEvents,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
      keepPreviousData: true,
      dedupingInterval: 2000,
    }
  );
};
