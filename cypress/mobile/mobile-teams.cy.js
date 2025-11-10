
const teamsPage = require('../../cypress/support/pages/teamsPage');

describe('Smoke tests on teams page TheVoice', () => {

    beforeEach(() => {
        teamsPage.visit();
    });

    it('Teams - deve verificar os principais elementos', () => {
        teamsPage.getTeamsBanner().should('be.visible');
        //TODO: elemento de filtro de times é diff
    });

    it('Teams - deve verificar o layout, texto e link do card de cada time', () => {
        teamsPage.getImageSession().should('be.visible')
        teamsPage.getImageSession().find('img').should('be.visible').and(($img) => { expect($img[0].naturalWidth).to.be.greaterThan(0);});
        teamsPage.getImageSession().find('h3').should('be.visible').and('not.be.empty');
        teamsPage.getImageSession().find('a').should('be.visible').and('have.attr', 'href').and('match', /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+$/);
    });

    it.only('Teams - deve verificar o filtro por time', () => {
        teamsPage.getWhiteButtonFiltered().should('contain.text', 'Todos');
        //TODO: elemento de filtro de times é diff
        teamsPage.getWhiteButtonFiltered().should('contain.text', 'Duda Beat');
        teamsPage.getImageSession().find('.flex .flex-col').should('be.visible').and('have.length.gte', 2);
    });

});