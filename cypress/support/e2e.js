// Importa o comando de snapshot de imagem
import { addMatchImageSnapshotCommand } from "@simonsmith/cypress-image-snapshot/command";

// Importa os commands customizados de API
import "./api/api-commands";

// Habilita filtragem por tags/texto (@cypress/grep)
import "@cypress/grep";

addMatchImageSnapshotCommand({
  failureThreshold: 0.18, // Exemplo: 18% de tolerância
  failureThresholdType: "percent", // Tipo de tolerância: 'percent' ou 'pixel'
});
// Ignorar erros de hidratação do Next.js no ambiente de dev para não falhar smoke
// Referência: https://react.dev/link/hydration-mismatch
Cypress.on("uncaught:exception", (err) => {
  const msg = (err && err.message) || "";
  const shouldIgnoreReactErrors =
    (Cypress.env("E2E_IGNORE_REACT_ERRORS") ?? true) !== false;

  if (
    shouldIgnoreReactErrors &&
    (/Hydration failed|hydration mismatch/i.test(msg) ||
      /Minified React error/i.test(msg))
  ) {
    return false; // não falhar o teste
  }
  return true; // manter o padrão para outros erros
});

// Comando utilitário para aguardar carregamento inicial de dados/SSR → CSR
// Configurável via E2E_DELAY_MS (ms). Default: 1500ms
Cypress.Commands.add("waitForPage", (ms) => {
  const delay = Number(ms ?? Cypress.env("E2E_DELAY_MS") ?? 1500);
  cy.wait(delay, { log: true });
});
