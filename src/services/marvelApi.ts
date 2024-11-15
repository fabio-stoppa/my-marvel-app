import axios, { AxiosError } from "axios";
import md5 from "md5";
import { MarvelResponse, Character } from "../types/marvel";

const publicKey = "";
const privateKey = "";

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

export const fetchCharacters = async (
  offset = 0,
  limit = 10,
  nameStartsWith?: string
): Promise<Character[]> => {
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + publicKey);

  const params = {
    ts: timestamp,
    apikey: publicKey,
    hash,
    limit,
    offset,
    ...(nameStartsWith && { nameStartsWith }),
  };

  try {
    const response = await marvelApi.get<MarvelResponse>("characters", {
      params,
    });

    return response.data.data.results;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "Error fetching characters:",
        axiosError.response.data || axiosError.message
      );
    } else {
      console.error("Error fetching characters:", axiosError.message);
    }
    throw error;
  }
};
