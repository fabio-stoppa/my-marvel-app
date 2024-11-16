import { EventResponse } from "@/types/events";
import { generateAuthParams, marvelApi } from "./marvelApi";

export const getEvents = async (
  nameStartsWith?: string
): Promise<EventResponse> => {
  const params = {
    ...generateAuthParams(),
    nameStartsWith,
  };

  try {
    const response = await marvelApi.get<EventResponse>("events", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
