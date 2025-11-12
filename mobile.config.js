const { defineConfig } = require('cypress');
const { merge } = require('mochawesome-merge');
const { writeFileSync, mkdirSync } = require('fs');
const marge = require('mochawesome-report-generator');
const path = require('path');
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin');

export default defineConfig({
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    specPattern: 'cypress/mobile/**/**.cy.js',
    setupNodeEvents(on, config) {
				addMatchImageSnapshotPlugin(on, config);

        on('after:run', async () => {
					try {
						const reportsDir = path.resolve('reports/mocha');
						mkdirSync(reportsDir, { recursive: true });
						const report = await merge({ files: ['reports/mocha/*.json'] });
						const mergedPath = path.join(reportsDir, 'mochawesome.json');
						writeFileSync(mergedPath, JSON.stringify(report));
						await marge.create(report, { reportDir: reportsDir, reportFilename: 'index', inline: true, overwrite: true });
					} catch (e) {
						console.error('Falha ao mesclar mochawesome reports', e);
					}
				});

				return config;
			},
      screenshotsFolder: 'reports/screenshots',
      videosFolder: 'reports/videos',
      reporter: 'cypress-multi-reporters',
      reporterOptions: {
        reporterEnabled: 'mochawesome',
        mochawesomeReporterOptions: {
          reportDir: 'reports/mocha',
          overwrite: false,
          html: false,
          json: true,
        },
      },
  },
});
