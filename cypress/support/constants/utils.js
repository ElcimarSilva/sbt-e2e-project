class UTILS {
    constructor() {
        // Obtém a URL base do ambiente ou usa o valor padrão
        this.THE_VOICE_BASE_URL = Cypress.env('THE_VOICE_BASE_URL') || "https://thevoicebrasil-dev.sbtlab.io";
    }
}

module.exports = new UTILS();