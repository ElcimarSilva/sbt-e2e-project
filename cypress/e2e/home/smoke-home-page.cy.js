const homePage = require('../../support/pages/homePage');

describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/novidades?**').as('getNews');
        cy.intercept('GET', '**/tecnicos?**').as('getTechnicians');
        cy.intercept('GET', '**/times?**').as('getTeams');
        cy.wait('@getNews');
        cy.wait('@getTechnicians');
        cy.wait('@getTeams');

        homePage.getImageMainContainer().should('be.visible');
        homePage.getNewsCards().should('be.visible').should('have.length.gte', 4);

        homePage.getSeeMoreContainer().should('be.visible').and('contain.text', 'Veja mais');
        homePage.getSeeMoreItens().should('be.visible').and('have.length.gte', 2);
        homePage.getPlaylistSession().should('be.visible').and('contain.text', 'Playlists');
    });

    it('deve trocar o banner ao clicar na seta', () => {
        homePage.getBannerTitle().should('be.visible').should('not.be.empty');
        homePage.getFirstImageMainContainer().should('be.visible');
        homePage.clickBannerNext();
        homePage.getBannerTitle().should('be.visible').should('not.be.empty')
        homePage.getSecondImageMainContainer().should('be.visible');
    });

    it('deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/tecnicos-do-the-voice-brasil-no-sbt-carisma-e-suficiente');
    });

    it('deve abrir um item da playlist ao clicar', () => {

    });

    it('deve verificar e abrir um video na sessão videos', () => {

    });

    it('deve verificar o funcionamento da sessão de reels', () => {

    });

    it('deve abrir a politica de privacidade', () => {

    });

    it('deve abrir os termos de uso', () => {

    });
    it('deve abrir um item da playlist ao clicar', () => {

    });

    it('deve verificar e abrir um video na sessão videos', () => {

    });

    it('deve verificar o funcionamento da sessão de reels', () => {

    });

    it('deve abrir a politica de privacidade', () => {

    });

    it('deve abrir os termos de uso', () => {

    });
});