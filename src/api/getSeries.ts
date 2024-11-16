import { SeriesResponse } from "@/types/series";
import { generateAuthParams, marvelApi } from "./marvelApi";

export const getSeries = async (
  titleStartsWith?: string
): Promise<SeriesResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith,
  };

  try {
    const response = await marvelApi.get<SeriesResponse>("series", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
