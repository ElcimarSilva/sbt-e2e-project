const { defineConfig } = require('cypress');
const { merge } = require('mochawesome-merge');
const { writeFileSync, mkdirSync } = require('fs');
const marge = require('mochawesome-report-generator');
const path = require('path');
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin');
const { sendHtmlReportToDiscord } = require('./cypress/support/commands');

module.exports = defineConfig({
	e2e: {
		// baseUrl: 'https://example.cypress.io',
		specPattern: 'cypress/e2e/**/*.cy.js',
		excludeSpecPattern: 'cypress/e2e/mobile/**',
		supportFile: 'cypress/support/e2e.js',
		defaultCommandTimeout: 20000,
		pageLoadTimeout: 12000,
		requestTimeout: 10000,
		responseTimeout: 40000,
			setupNodeEvents(on, config) {
				addMatchImageSnapshotPlugin(on, config);

				// Captura a variável do cypress.env.json ou variável de ambiente do sistema com prefixo CYPRESS_
				const DISCORD_WEBHOOK_URL = config.env.DISCORD_WEBHOOK_URL || process.env.CYPRESS_DISCORD_WEBHOOK_URL;
				console.log('DISCORD_WEBHOOK_URL:', DISCORD_WEBHOOK_URL ? 'Configurado' : 'Não encontrado');

				// gerar JSON único do mochawesome e HTML agregado ao final da execução
				on('after:run', async () => {
					try {
						const reportsDir = path.resolve('reports/mocha');
						mkdirSync(reportsDir, { recursive: true });
						const report = await merge({ files: ['reports/mocha/*.json'] });
						const mergedPath = path.join(reportsDir, 'mochawesome.json');
						writeFileSync(mergedPath, JSON.stringify(report));
						await marge.create(report, { reportDir: reportsDir, reportFilename: 'index', inline: true, overwrite: true });
						console.log("Reportes mochawesome mesclados com sucesso.");
					} catch (e) {
						console.error('Falha ao mesclar mochawesome reports', e);
					}
					try {
						const reportPath = "./reports/mocha/index.html"; // caminho do seu relatório HTML
						await sendHtmlReportToDiscord(reportPath, "📢 Testes finalizados! Segue o relatório completo:", DISCORD_WEBHOOK_URL);
					} catch (err) {
						console.error("Erro ao enviar relatório ao Discord:", err);
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