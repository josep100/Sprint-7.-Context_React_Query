import { describe, it, expect, vi } from 'vitest';
import { getMovies, getMovieById } from '../features/movies/services/tmdb.service';
import { tmdbFetch } from '../features/movies/services/tmdbClient'; 


vi.mock('../features/movies/services/tmdbClient.ts', () => ({
  tmdbFetch: vi.fn() 
}));

describe('tmdb.service', () => {

  it('getMovies should call tmdbFetch with the popular movies endpoint', async () => {
    const mockData = { results: [] };
    
    vi.mocked(tmdbFetch).mockResolvedValue(mockData);

    const result = await getMovies();

    
    expect(tmdbFetch).toHaveBeenCalledWith(
      '/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc'
    );
    expect(result).toEqual(mockData);
  });

  it('getMovieById should build the URL with the provided ID', async () => {
    const movieId = '550';
    vi.mocked(tmdbFetch).mockResolvedValue({ id: 550, title: 'Fight Club' });

    await getMovieById(movieId);

    
    expect(tmdbFetch).toHaveBeenCalledWith(`/movie/550?language=es-ES`);
  });
});
