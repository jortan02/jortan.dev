import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortfolioIndex from './page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('contentlayer/generated', () => ({
  allPortfolios: [
    {
      slug: 'a',
      title: 'Project A',
      description: 'Desc A',
      category: 'web',
      skills: ['ts'],
      date: '2024-01-01',
      published: true,
    },
    {
      slug: 'b',
      title: 'Project B',
      description: 'Desc B',
      category: 'ml',
      skills: ['python'],
      date: '2024-02-01',
      published: true,
    },
  ],
}));

describe('PortfolioIndex', () => {
  it('renders heading and shows projects', () => {
    render(<PortfolioIndex />);
    expect(screen.getByRole('heading', { level: 1, name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getAllByText('Project B').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Project A').length).toBeGreaterThanOrEqual(1);
  });

  it('filters by category when category button clicked', async () => {
    render(<PortfolioIndex />);
    const mlButton = screen.getByRole('button', { name: /ML/i });
    const user = userEvent.setup();
    await user.click(mlButton);

    expect(screen.queryAllByText('Project A').length).toBe(0);
    expect(screen.getAllByText('Project B').length).toBeGreaterThanOrEqual(1);
  });
});


