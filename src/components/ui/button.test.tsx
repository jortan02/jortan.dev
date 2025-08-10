import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Button variant="secondary" size="lg">X</Button>);
    const btn = screen.getByRole('button', { name: 'X' });
    expect(btn.className).toMatch(/bg-secondary/);
    expect(btn.className).toMatch(/h-10/);
  });
});


