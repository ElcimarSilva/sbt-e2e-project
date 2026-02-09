class UTILS {
  constructor() {
    // Obtém a URL base do ambiente: prioriza CYPRESS_BASE_URL e mantém compatibilidade
    this.CYPRESS_THE_VOICE_BASE_URL =
      Cypress.env("CYPRESS_BASE_URL") ||
      Cypress.env("CYPRESS_THE_VOICE_BASE_URL");
  }
}

module.exports = new UTILS();
