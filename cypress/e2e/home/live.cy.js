
const homePage = require('../../support/pages/homePage');
describe('Tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });
    it('deve verificar o direcionamento para TV Ao vivo', () => {
        homePage.getLiveButton().should('be.visible').and('have.attr', 'href', 'https://www.sbt.com.br/ao-vivo');

        cy.visit('https://www.sbt.com.br/ao-vivo');
        cy.origin('https://www.sbt.com.br/ao-vivo', () => {
            cy.get('[class="cookie-banner-lgpd_button_aceitar"]').click();
            cy.get('[class="live-video"]').should('be.visible')
            cy.get('[class="live-video"]').find('iframe').should('have.attr', 'src');
        });

    });
});