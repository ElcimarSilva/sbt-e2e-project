class UTILS {
    constructor() {
        // Obtém a URL base do ambiente ou usa o valor padrão
        this.CYPRESS_THE_VOICE_BASE_URL = Cypress.env('CYPRESS_THE_VOICE_BASE_URL') || "https://thevoicebrasil-dev.sbtlab.io";
    }
}

module.exports = new UTILS();