const votePage = require('../../support/pages/votePage');

describe('Smoke tests on vote page TheVoice', () => {

    beforeEach(() => {
        votePage.visit();
    });

    it('Vote - deve verificar a pagina de votação', () => {
        cy.intercept('GET', '**/tecnicos/?_rsc=o1sbc').as('getTechnicians');
        cy.intercept('GET', '**/novidades/?_rsc=o1sbc').as('getNews');
        cy.intercept('GET', '**/times/?_rsc=o1sbc').as('getTeams');
        cy.intercept('GET', '**/videos/?_rsc=o1sbc').as('getVideos');
        cy.get('button').contains('Thiago').should('be.visible').click();
        cy.wait('@getTechnicians');
        cy.wait('@getNews');
        cy.wait('@getTeams');
        cy.wait('@getVideos');
        cy.get('button').contains('Thiago').should('be.visible').click();
        cy.get('button').contains('Entrar').should('be.visible').click();

        cy.origin('https://conta.sbtlab.io', () => {
            cy.get('h4').contains('Vamos entrar?').should('be.visible');
        });
    });
});