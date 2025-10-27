
const teamsPage = require('../../support/pages/teamsPage');

describe('Smoke tests on teams page TheVoice', () => {

    beforeEach(() => {
        teamsPage.visit();
    });

    it.only('Teams - deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/tecnicos/**').as('getTechnicians');
        cy.intercept('GET', '**/novidades/**').as('getNews');
        cy.intercept('GET', '**/videos/**').as('getVideos');
        cy.wait('@getTechnicians').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getNews').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getVideos').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        teamsPage.getTeamsBanner().should('be.visible');
        teamsPage.getFilterSession().should('be.visible');

    });

    it('Teams - deve verificar o layout do card de cada time', () => {
    });

    it('Teams - deve verificar os links de direcionamento para instagram doo card', () => {
    });

    it('Teams - deve verificar o filtro por time', () => {
    });

});