import { ComicResponse } from "@/types/comics";
import { marvelApi, generateAuthParams } from "./marvelApi";

export const getComics = async (
  titleStartsWith?: string
): Promise<ComicResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith,
  };

  try {
    const response = await marvelApi.get<ComicResponse>("comics", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
