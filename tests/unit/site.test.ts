import { describe, expect, it } from 'vitest';
import { cleanPath } from '../../src/lib/site';

describe('cleanPath', () => {
  it.each([
    ['/', '/'],
    ['/index.html', '/'],
    ['/prompts.html', '/prompts'],
    ['/prompts/x.html', '/prompts/x'],
    ['/prompts/', '/prompts'],
    ['/prompts', '/prompts'],
    ['/prompts/category/education.html', '/prompts/category/education'],
    ['/404.html', '/404'],
  ])('%s → %s', (input, expected) => {
    expect(cleanPath(input)).toBe(expected);
  });
});
