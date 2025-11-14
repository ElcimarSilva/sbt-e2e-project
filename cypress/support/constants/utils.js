class UTILS {
    constructor() {
        this.THE_VOICE_BASE_URL = "https://thevoicebrasil-dev.sbtlab.io" || Cypress.env('THE_VOICE_BASE_URL');
    }
}

    module.exports = new UTILS();