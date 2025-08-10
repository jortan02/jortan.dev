import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toContain('px-2');
    expect(cn('px-2', 'py-1')).toContain('py-1');
  });

  it('deduplicates conflicting tailwind classes, keeping the latter', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toContain('px-4');
    expect(result.includes('px-2')).toBe(false);
  });
});


