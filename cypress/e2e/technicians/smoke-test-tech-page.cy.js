
const techniciansPage = require('../../support/pages/techniciansPage');

describe('Smoke tests on technicians page TheVoice', () => {

    beforeEach(() => {
        techniciansPage.visit();
    });

    it('deve verificar os principais elementos', () => {
        techniciansPage.getLayoutGrid().should('be.visible');
        techniciansPage.getTechnicianCards().should('have.length', 4);
        techniciansPage.getTitleTopPage().should('contain.text', 'Técnicos');
        techniciansPage.getTitleTopPage().find('h1').should('exist');
    });

});