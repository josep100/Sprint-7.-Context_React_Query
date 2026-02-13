import { describe, it, expect, vi, beforeEach } from 'vitest';

// 1. Esto debe ir ANTES que el import de tu servicio
vi.stubEnv('VITE_API_URL', 'https://api.test.com');
vi.stubEnv('VITE_API_KEY', 'mi-token-de-prueba-123');

// Forzamos a Vitest a que use estos valores para import.meta.env
vi.mock('vite', () => ({
  import: {
    meta: {
      env: {
        VITE_API_URL: 'https://api.test.com',
        VITE_API_KEY: 'mi-token-de-prueba-123',
      },
    },
  },
}));

import { tmdbFetch } from '../services/tmdbClient';

describe('tmdbFetch', () => {
  
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should return data when the response is successful (ok: true', async () => {
    const mockData = { results: [1, 2, 3] };
    
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    // Act
    const result = await tmdbFetch('/movie/popular');

    // Assert
    expect(result).toEqual(mockData);
    
    // CORRECCIÓN: La URL y el Token deben ser los que pusiste arriba en el stubEnv
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.test.com'), // Verifica que no haya doble barra //
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer mi-token-de-prueba-123', // Debe coincidir con el stubEnv
          'Content-Type': 'application/json',
        }
      })
    );
  });

  it('should throw an error if the response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(tmdbFetch('/error')).rejects.toThrow('TMDB error: 404');
  });
});
