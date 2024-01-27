const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_API_KEY;
import axios from "axios";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchData = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};
