import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    specPattern: 'cypress/mobile/**/**.cy.js',
  },
});
