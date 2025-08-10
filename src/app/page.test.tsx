import { render, screen } from '@testing-library/react';
import Home from './page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Home page', () => {
  it('renders the main heading and subtitle', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1, name: /jortan/i })).toBeInTheDocument();
    expect(screen.getByText(/Computer\s*Science graduate/i)).toBeInTheDocument();
  });
});


