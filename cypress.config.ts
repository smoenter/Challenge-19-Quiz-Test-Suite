import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
  },

  e2e: {
    baseUrl: 'http://localhost:3001',
    fixturesFolder: 'cypress/fixtures',
    video: true, // Enable video recording during e2e tests
    parallel: true, // Enable parallel test execution
    supportFile: false,
    env: {
      apiUrl: 'http://localhost:3001/api', // Example environment variable
    },
    setupNodeEvents(on, config) {
      // Example event listener
      on('before:run', () => {
        console.log('Tests are about to start!');
      });
    },
  },
});