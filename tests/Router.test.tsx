import { screen } from '@testing-library/dom';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '@/routes';
import { render } from '@testing-library/react';

describe('Router', () => {
  const routeTests = [
    { route: '/', heading: /home/i },
    { route: '/playground', heading: /playground/i },
    { route: '/techstack', heading: /tech stack/i },
    { route: '/invalid-route', heading: /not found/i },
  ];

  it.each(routeTests)(
    'should render the correct page for $route',
    ({ route, heading }) => {
      navigateTo(route);

      if (route === '/invalid-route') {
        expect(screen.getByText(heading)).toBeInTheDocument();
      } else {
        expect(
          screen.getByRole('heading', { level: 1, name: heading }),
        ).toBeInTheDocument();
      }
    },
  );
});

const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(<RouterProvider router={router} />);
};
