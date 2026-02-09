const { defineConfig } = require("cypress");
const { merge } = require("mochawesome-merge");
const { writeFileSync, mkdirSync } = require("fs");
const marge = require("mochawesome-report-generator");
const path = require("path");
const {
  addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin");
const { sendHtmlReportToDiscord } = require("./cypress/support/commands");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    specPattern: "cypress/mobile/**/**.cy.js",
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      // Define baseUrl precedence: system env -> config.env -> fallback (staging)
      const resolvedBaseUrl =
        process.env.CYPRESS_BASE_URL ||
        config.env.CYPRESS_BASE_URL ||
        "https://tv-stg.sbtlab.io";
      config.baseUrl = resolvedBaseUrl;
      try {
        require("@cypress/grep/src/plugin")(config);
      } catch (e) {
        console.warn(
          "cypress-grep plugin not loaded (mobile):",
          e?.message || e,
        );
      }
      // Captura a variável do cypress.env.json ou variável de ambiente do sistema com prefixo CYPRESS_
      const DISCORD_WEBHOOK_URL =
        config.env.DISCORD_WEBHOOK_URL ||
        process.env.CYPRESS_DISCORD_WEBHOOK_URL;
      console.log(
        "DISCORD_WEBHOOK_URL:",
        DISCORD_WEBHOOK_URL ? "Configurado" : "Não encontrado",
      );

      on("after:run", async () => {
        try {
          const reportsDir = path.resolve("reports/mocha");
          mkdirSync(reportsDir, { recursive: true });
          const report = await merge({ files: ["reports/mocha/*.json"] });
          const mergedPath = path.join(reportsDir, "mochawesome.json");
          writeFileSync(mergedPath, JSON.stringify(report));
          await marge.create(report, {
            reportDir: reportsDir,
            reportFilename: "index",
            inline: true,
            overwrite: true,
          });
        } catch (e) {
          console.error("Falha ao mesclar mochawesome reports", e);
        }
        try {
          const reportPath = "./reports/mocha/index.html"; // caminho do seu relatório HTML
          if (DISCORD_WEBHOOK_URL) {
            await sendHtmlReportToDiscord(
              reportPath,
              "📢 Testes finalizados! Segue o relatório completo:",
              DISCORD_WEBHOOK_URL,
            );
          } else {
            console.log(
              "DISCORD_WEBHOOK_URL não configurada — pulando envio para Discord",
            );
          }
        } catch (err) {
          console.error("Erro ao enviar relatório ao Discord:", err);
        }
      });

      return config;
    },
    screenshotsFolder: "reports/screenshots",
    videosFolder: "reports/videos",
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome, mocha-junit-reporter",
      mochawesomeReporterOptions: {
        reportDir: "reports/mocha",
        overwrite: false,
        html: false,
        json: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "reports/junit/results-[hash].xml",
        testsuitesTitle: "Cypress E2E (mobile)",
        toConsole: false,
      },
    },
  },
});
