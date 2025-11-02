import { defineConfig } from 'cypress';
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin');
export default defineConfig({
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    specPattern: 'cypress/mobile/**/**.cy.js',
    setupNodeEvents(on, config) {
				addMatchImageSnapshotPlugin(on, config);
				return config;
			},
  },
});
