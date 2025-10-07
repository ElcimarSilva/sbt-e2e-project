const { defineConfig } = require('cypress');
const { merge } = require('mochawesome-merge');
const { writeFileSync, mkdirSync } = require('fs');
const marge = require('mochawesome-report-generator');
const path = require('path');

module.exports = defineConfig({
	e2e: {
		// baseUrl: 'https://example.cypress.io',
		specPattern: 'cypress/e2e/**/*.cy.js',
		excludeSpecPattern: 'cypress/e2e/mobile/**',
		supportFile: 'cypress/support/e2e.js',
			setupNodeEvents(on, config) {
				// gerar JSON único do mochawesome e HTML agregado ao final da execução
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
	},
	viewportWidth: 1366,
	viewportHeight: 768,
	video: true,
	retries: {
    	runMode: 2,
    	openMode: 0,
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
});