import { ComicResponse } from "@/types/comics";
import { marvelApi, generateAuthParams } from "./marvelApi";

export const getComics = async ({
  nameStartsWith,
  offset,
  limit,
}: {
  nameStartsWith?: string;
  offset: number;
  limit: number;
}): Promise<ComicResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith: nameStartsWith,
    offset,
    limit,
  };

  try {
    const response = await marvelApi.get<ComicResponse>("comics", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
