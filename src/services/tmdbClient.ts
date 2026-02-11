const BASE_URL = import.meta.env.VITE_API_URL;
const TMDB_TOKEN = import.meta.env.VITE_API_KEY;

const options = {
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export const tmdbFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
};