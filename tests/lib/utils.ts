import { http, HttpResponse, JsonBodyType } from 'msw';
import { server } from '../mocks/server';

/**
 * Generic helper to mock GET requests with optional data.
 * @param endpoint The API endpoint to mock.
 * @param data Data to return on a successful response.
 */
export const mockGetRequest = <T extends JsonBodyType>(
  endpoint: string,
  data: T | T[],
) => {
  server.use(http.get(endpoint, () => HttpResponse.json(data)));
};

/**
 * Helper to mock GET requests that return an error.
 * @param endpoint The API endpoint to mock.
 */
export const mockFailedGetRequest = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};
