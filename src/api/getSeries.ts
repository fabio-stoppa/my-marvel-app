import { SeriesResponse } from "@/types/series";
import { generateAuthParams, marvelApi } from "./marvelApi";

export const getSeries = async ({
  nameStartsWith,
  offset,
  limit,
}: {
  nameStartsWith?: string;
  offset: number;
  limit: number;
}): Promise<SeriesResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith: nameStartsWith,
    offset,
    limit,
  };

  try {
    const response = await marvelApi.get<SeriesResponse>("series", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching series:", error);
    throw error;
  }
};
