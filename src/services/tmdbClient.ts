
const createOptions = () => ({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});


export const tmdbFetch = async <T>(endpoint: string): Promise<T> => {
  
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, createOptions());

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
};