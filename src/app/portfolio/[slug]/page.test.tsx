import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('notFound'); },
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
      body: { raw: '![img](/images/portfolio/Jordan_Tan_Site.png)\n\nSome text' },
      repository: 'jortan02/repo',
      url: 'example.com',
    },
  ],
}));

vi.mock('image-size/fromFile', () => ({
  imageSizeFromFile: vi.fn().mockResolvedValue({ width: 100, height: 50 }),
}));

describe('Portfolio slug page', () => {
  it('renders project when slug exists', async () => {
    render(await Page({ params: Promise.resolve({ slug: 'a' }) } as any));
    expect(screen.getByRole('heading', { level: 1, name: /project a/i })).toBeInTheDocument();
    expect(screen.getByText(/desc a/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub →' })).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(screen.getByRole('link', { name: 'Website →' })).toHaveAttribute('href', expect.stringContaining('example.com'));
  });

  it('throws notFound when slug missing', async () => {
    await expect(async () => {
      render(await Page({ params: Promise.resolve({ slug: 'missing' }) } as any));
    }).rejects.toThrow('notFound');
  });
});


