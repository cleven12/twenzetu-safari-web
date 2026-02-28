/**
 * api.js — Xenohuru API service
 *
 * Tries the live Django REST API first.
 * Falls back to MOCK_DATA if API is unreachable (offline / not deployed).
 *
 * Live API: https://cf89615f228bb45cc805447510de80.pythonanywhere.com/
 * Toggle: set USE_MOCK = true to always use mock data during development.
 */

import { MOCK_DATA } from './mockdata.js';

const API_BASE = 'https://cf89615f228bb45cc805447510de80.pythonanywhere.com';

// Set to false to use the live API; true forces mock data
export const USE_MOCK = false;

/** Generic fetch with mock fallback and timeout */
async function apiFetch(path, mockFallback) {
  if (USE_MOCK) return mockFallback();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn(`[api] Falling back to mock data for ${path}:`, err.message);
    return mockFallback();
  }
}

export const api = {
  /** GET /api/v1/regions/ */
  getRegions: () => apiFetch('/regions/', () => MOCK_DATA.regions),

  /** GET /api/v1/attractions/ */
  getAttractions: () => apiFetch('/attractions/', () => MOCK_DATA.attractions),

  /** GET /api/v1/attractions/featured/ */
  getFeaturedAttractions: () =>
    apiFetch('/attractions/featured/', () =>
      MOCK_DATA.attractions.filter(a => a.is_featured)
    ),

  /** GET /api/v1/attractions/:slug/ */
  getAttraction: (slug) =>
    apiFetch(`/attractions/${slug}/`, () => {
      const detail = MOCK_DATA.attractionDetails[slug];
      if (!detail) throw new Error(`Attraction "${slug}" not found in mock data`);
      return detail;
    }),

  /** GET /api/v1/weather/current/?attraction=:slug */
  getWeather: (slug) =>
    apiFetch(`/weather/current/?attraction=${slug}`, () => MOCK_DATA.weather.current_weather),

  /** GET /api/v1/weather/forecast/?attraction=:slug */
  getWeatherForecast: (slug) =>
    apiFetch(`/weather/forecast/?attraction=${slug}`, () => MOCK_DATA.weather.forecast),

  /** GET /api/v1/weather/seasonal/?attraction=:slug */
  getSeasonalPatterns: (slug) =>
    apiFetch(`/weather/seasonal/?attraction=${slug}`, () => MOCK_DATA.weather.seasonal_patterns),

  /** GET /api/v1/attractions/by_category/ */
  getAttractionsByCategory: () =>
    apiFetch('/attractions/by_category/', () => ({})),

  /** GET /api/v1/attractions/by_region/ */
  getAttractionsByRegion: () =>
    apiFetch('/attractions/by_region/', () => ({})),
};
