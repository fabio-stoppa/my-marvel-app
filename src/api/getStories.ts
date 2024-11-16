import { marvelApi, generateAuthParams } from "./marvelApi";
import { StoryResponse } from "@/types/stories";

export const getStories = async (
  titleStartsWith?: string
): Promise<StoryResponse> => {
  const params = {
    ...generateAuthParams(),
    titleStartsWith,
  };

  try {
    const response = await marvelApi.get<StoryResponse>("stories", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
