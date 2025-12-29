
const techniciansPage = require('../../support/pages/techniciansPage');

describe('Smoke tests on technicians page TheVoice', () => {

    beforeEach(() => {
        techniciansPage.visit();
    });

    it('Technicians - deve verificar os principais elementos', () => {
        techniciansPage.getLayoutGrid().should('be.visible');
        techniciansPage.getTechnicianCards().should('have.length', 4);
        techniciansPage.getTitleTopPage().should('contain.text', 'Técnicos');
        techniciansPage.getTitleTopPage().find('h1').should('exist');
    });

    it('Technicians - deve haver os links de direcionamento para instagram e spotify dos tecnicos', () => {
        techniciansPage.getTechnicianCards().find('a').should('have.attr', 'href').and('match', /^(https?:\/\/)?(www\.)?(instagram\.com|spotify\.com)\/.+$/);
    });

    it('Technicians - deve verificar layout do card', () => {
        techniciansPage.getTechnicianCards().find('img').should('be.visible').and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        techniciansPage.getTechnicianCards().find('h3').should('be.visible').and('not.be.empty');
        techniciansPage.getTechnicianCards().find('p').should('be.visible').and('not.be.empty');
    });
});