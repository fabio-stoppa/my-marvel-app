import { marvelApi, generateAuthParams } from "./marvelApi";
import { StoryResponse } from "@/types/stories";

export const getStories = async ({
  nameStartsWith,
  offset,
  limit,
}: {
  nameStartsWith?: string;
  offset: number;
  limit: number;
}): Promise<StoryResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith: nameStartsWith,
    offset,
    limit,
  };

  try {
    const response = await marvelApi.get<StoryResponse>("stories", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
