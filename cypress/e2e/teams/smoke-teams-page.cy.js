
const teamsPage = require('../../support/pages/teamsPage');

describe('Smoke tests on teams page TheVoice', () => {

    beforeEach(() => {
        teamsPage.visit();
    });

    it('Teams - deve verificar os principais elementos', () => {
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

    it('Teams - deve verificar o layout, texto e link do card de cada time', () => {
        teamsPage.getImageSession().should('be.visible')
        teamsPage.getImageSession().find('img').should('be.visible').and(($img) => { expect($img[0].naturalWidth).to.be.greaterThan(0);});
        teamsPage.getImageSession().find('h3').should('be.visible').and('not.be.empty');
        teamsPage.getImageSession().find('a').should('be.visible').and('have.attr', 'href').and('match', /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+$/);
    });

    it('Teams - deve verificar o filtro por time', () => {
        teamsPage.getWhiteButtonFiltered().should('contain.text', 'Todos');
        teamsPage.getTeamsButtonFilter().contains('Duda Beat').should('be.visible').click();
        teamsPage.getWhiteButtonFiltered().should('contain.text', 'Duda Beat');
        teamsPage.getImageSession().find('.flex .flex-col').should('be.visible').and('have.length.gte', 2);
    });

});