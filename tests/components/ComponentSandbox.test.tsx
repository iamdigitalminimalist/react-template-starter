import ComponentSandbox from '@/components/ComponentSandbox';
import { render, screen } from '@testing-library/react';

describe('ComponentSandbox', () => {
  it('should render the correct text', () => {
    render(<ComponentSandbox />);
    const element = screen.getByText(/component sandbox/i);
    expect(element).toBeInTheDocument();
  });
});
