import { http, HttpResponse, JsonBodyType, delay } from 'msw';
import { server } from '../mocks/server';

/**
 * Mocks a GET request with either a successful or error response.
 *
 * @template T - The type of the JSON body to return in the response.
 * @param endpoint - The API endpoint to mock.
 * @param options - Configuration options for the mock response.
 * @param options.data - The data to return in the response body for a successful request.
 * @param options.error - If `true`, simulates an error response (default: `false`).
 * @param options.shouldDelay - If `true`, introduces a delay before the response (default is `false`).
 */
export const mockGetRequest = async <T extends JsonBodyType>(
  endpoint: string,
  options: {
    data: T | T[] | null;
    error?: boolean;
    shouldDelay?: boolean;
  },
) => {
  const { data = null, error = false, shouldDelay = false } = options;

  if (shouldDelay) await delay();

  const handler = error
    ? http.get(endpoint, () => HttpResponse.error())
    : http.get(endpoint, () => HttpResponse.json(data));

  server.use(handler);
};

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    }),
  );
};

export const simulateError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};
