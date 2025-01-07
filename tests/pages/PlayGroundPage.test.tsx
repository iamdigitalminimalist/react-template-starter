import PlayGroundPage from '@/pages/PlayGroundPage';
import { render } from '@testing-library/react';

describe('PlayGroundPage', () => {
  it('should render without crashing', () => {
    const { container } = render(<PlayGroundPage />);

    expect(container).toBeInTheDocument();
  });
});
