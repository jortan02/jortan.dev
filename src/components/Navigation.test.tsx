import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { Navigation } from './Navigation';

// Mock pathname for different scenarios
const usePathnameMock = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}));

describe('Navigation', () => {
  it('hides back link on home path', () => {
    usePathnameMock.mockReturnValue('/');
    const { container } = render(<Navigation />);
    const backLink = container.querySelector('a[href="/"]');
    expect(backLink).toBeTruthy();
    expect(backLink!.className).toMatch(/hidden/);
  });

  it('shows back link when not on home and points to parent path', () => {
    usePathnameMock.mockReturnValue('/portfolio/some-slug');
    const { container } = render(<Navigation />);
    const backLink = container.querySelector('a[href="/portfolio"]');
    expect(backLink).toBeTruthy();
    expect(backLink!.className).not.toMatch(/hidden/);
  });

  it('toggles header background on scroll', () => {
    usePathnameMock.mockReturnValue('/');
    const { container } = render(<Navigation />);
    const header = container.querySelector('header')!;
    // initial (not scrolled)
    expect(header.className).toMatch(/bg-transparent/);
    // simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    return waitFor(() => {
      expect(header.className).toMatch(/bg-neutral-900/);
    });
  });
});


