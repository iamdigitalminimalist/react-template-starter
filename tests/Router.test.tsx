import { screen } from '@testing-library/dom';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '@/routes';
import { render } from '@testing-library/react';

describe('Router', () => {
  it('should render the home page for /', () => {
    navigateTo('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /home/i }),
    ).toBeInTheDocument();
  });

  it('should render the playground page for /playground', () => {
    navigateTo('/playground');
    expect(
      screen.getByRole('heading', { level: 1, name: /playground/i }),
    ).toBeInTheDocument();
  });

  it('should render the tech stack page for /techstack', () => {
    navigateTo('/techstack');
    expect(
      screen.getByRole('heading', { level: 1, name: /tech stack/i }),
    ).toBeInTheDocument();
  });

  it('should render the not found page for invalid routes', () => {
    navigateTo('/invalid-route');

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});

const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(<RouterProvider router={router} />);
};
