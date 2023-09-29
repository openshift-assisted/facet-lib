import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { mainFields: ['module', 'jsnext:main', 'jsnext'] },
  test: {
    environment: 'happy-dom',
    setupFiles: ['lib/test-helpers/vitest.setup.ts'],
    server: {
      deps: {
        inline: [/@patternfly/],
      },
    },
  },
});
