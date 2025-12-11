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
		pageLoadTimeout: 16000,
		requestTimeout: 10000,
		responseTimeout: 40000,
		setupNodeEvents(on, config) {
			addMatchImageSnapshotPlugin(on, config);

			// Lista de variáveis de ambiente que devem ser carregadas
			const envVars = [
				'DISCORD_WEBHOOK_URL',
				'CYPRESS_CMS_API_TOKEN',
				'CYPRESS_CMS_BASE_URL',
				'CYPRESS_AUTH_BASE_URL',
				'CYPRESS_THE_VOICE_BASE_URL'
			];

			// Mescla variáveis de ambiente do sistema (com prefixo CYPRESS_) com as do cypress.env.json
			// Variáveis de ambiente do sistema têm prioridade sobre o arquivo JSON
			envVars.forEach(envVar => {
				const envValue = process.env[`CYPRESS_${envVar}`];
				if (envValue) {
					config.env[envVar] = envValue;
					console.log(`${envVar}: Carregado da variável de ambiente do sistema`);
				} else if (config.env[envVar]) {
					console.log(`${envVar}: Carregado do cypress.env.json`);
				} else {
					console.warn(`⚠️  ${envVar}: Não encontrado (nem em env vars nem em cypress.env.json)`);
				}
			});

			// Captura a variável do cypress.env.json ou variável de ambiente do sistema com prefixo CYPRESS_
			const DISCORD_WEBHOOK_URL = config.env.DISCORD_WEBHOOK_URL || process.env.CYPRESS_DISCORD_WEBHOOK_URL;

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