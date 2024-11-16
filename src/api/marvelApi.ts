import axios from "axios";
import md5 from "md5";

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

export const generateAuthParams = () => {
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + publicKey);
  return { ts: timestamp, apikey: publicKey, hash };
};

export const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});
