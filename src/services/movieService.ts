import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const token = import.meta.env.VITE_TMDB_TOKEN;
const url = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(
  query: string,
  page: number
): Promise<TMDBResponse> {
  if (!query.trim()) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const response = await axios.get<TMDBResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      page,
    },
  });

  return response.data;
}