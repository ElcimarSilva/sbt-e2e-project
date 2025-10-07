const homePage = require('../../support/pages/homePage');

describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('deve verificar os principais elementos', () => {
        homePage.getHeroContainer().should('be.visible');
        homePage.getNewsCards().should('be.visible').should('have.length.gte', 4);
    });

    it('deve trocar o banner ao clicar na seta', () => {
        homePage.getBannerTitle().should('be.visible').should('contain.text', 'SBT anunciam os técnicos e confirmam Tiago');
        homePage.clickBannerNext();
        homePage.getBannerTitle().should('be.visible').should('contain.text', 'Teste banner 2');
    });

    it('deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/tecnicos-do-the-voice-brasil-no-sbt-carisma-e-suficiente');
    });

});