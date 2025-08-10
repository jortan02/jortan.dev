import { render, screen } from '@testing-library/react';
import ContactIndex from './page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Contact page', () => {
  it('renders heading and links', async () => {
    render(await ContactIndex());
    expect(screen.getByRole('heading', { level: 1, name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github\.com/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin\.com/i })).toBeInTheDocument();
  });
});


