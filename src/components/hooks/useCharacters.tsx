import { Character, MarvelResponse } from "@/types/marvel";
import axios, { AxiosError } from "axios";
import md5 from "md5";
import useSWRInfinite from "swr/infinite";

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
export const PAGE_SIZE = 24;

const generateAuthParams = () => {
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + publicKey);
  return { ts: timestamp, apikey: publicKey, hash };
};

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

export const fetchCharacters = async ({
  offset,
  limit,
  nameStartsWith,
}: {
  offset: number;
  limit: number;
  nameStartsWith?: string;
}): Promise<{
  characters: Character[];
  total: number;
}> => {
  let convertedNameStartsWith = nameStartsWith;
  if (nameStartsWith === "") convertedNameStartsWith = undefined;
  const authParams = generateAuthParams();
  const params = {
    ...authParams,
    offset,
    limit,
    nameStartsWith: convertedNameStartsWith,
  };

  console.log(`Fetching characters with offset: ${offset}, limit: ${limit}`);

  try {
    const response = await marvelApi.get<MarvelResponse>("characters", {
      params,
    });

    return {
      characters: response.data.data.results,
      total: response.data.data.total,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    console.error("Error on Marvel's API:", axiosError.response.data);
    console.error("Response status:", axiosError.response.status);
  } else if (axiosError.request) {
    console.error("No API answer. Request error:", axiosError.request);
  } else {
    console.error("Unknown error:", axiosError.message);
  }
};

export const useCharacters = (nameStartsWith?: string) => {
  return useSWRInfinite<{ characters: Character[]; total: number }, Error>(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.characters.length) return null;

      return {
        offset: index * PAGE_SIZE,
        limit: PAGE_SIZE,
        nameStartsWith,
      };
    },
    fetchCharacters,
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      keepPreviousData: true,
    }
  );
};
