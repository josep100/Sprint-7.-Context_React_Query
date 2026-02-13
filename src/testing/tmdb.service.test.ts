import { describe, it, expect, vi } from 'vitest';
import { getMovies, getMovieById } from '../services/tmdb.service';
import { tmdbFetch } from '../services/tmdbClient'; // Importamos la original para mockearla

// 1. Mockeamos el módulo completo del cliente
vi.mock('../services/tmdbClient.ts', () => ({
  tmdbFetch: vi.fn() // Reemplazamos tmdbFetch por una función espía
}));

describe('tmdb.service', () => {

  it('getMovies should call tmdbFetch with the popular movies endpoint', async () => {
    const mockData = { results: [] };
    // Configuramos qué devuelve el mock solo para este test
    vi.mocked(tmdbFetch).mockResolvedValue(mockData);

    const result = await getMovies();

    // Assert: Verificamos que se llamó al cliente con el string exacto
    expect(tmdbFetch).toHaveBeenCalledWith(
      '/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc'
    );
    expect(result).toEqual(mockData);
  });

  it('getMovieById should build the URL with the provided ID', async () => {
    const movieId = '550';
    vi.mocked(tmdbFetch).mockResolvedValue({ id: 550, title: 'Fight Club' });

    await getMovieById(movieId);

    // Assert: Verificamos que el ID se inyectó correctamente en el string
    expect(tmdbFetch).toHaveBeenCalledWith(`/movie/550?language=es-ES`);
  });
});
