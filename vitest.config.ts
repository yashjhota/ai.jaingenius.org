import { defineConfig } from 'vitest/config';

// Unit tests cover plain logic in src/lib that does not import astro:content.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
