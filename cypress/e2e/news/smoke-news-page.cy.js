
const newsPage = require('../../support/pages/newsPage');

describe('Smoke tests on news page TheVoice', () => {

    beforeEach(() => {
        newsPage.visit();
    });

    it('deve verificar os principais elementos', () => {
        newsPage.getNewsLabel().should('be.visible');

    });
});