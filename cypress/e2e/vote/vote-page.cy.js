const votePage = require('../../support/pages/votePage');

describe('Smoke tests on vote page TheVoice', () => {

    beforeEach(() => {
        votePage.visit();
    });

    it('Vote - deve verificar os principais elementos', () => {
        cy.get('[aria-label="Votação"]').should('be.visible');
        cy.get('[class="gradient-bg-diagonal w-full max-w-[700px] rounded-sm py-8 px-4 md:px-8 flex flex-col gap-8 md:gap-10 shadow-xl ring-1 ring-white/10"]').should('be.visible');
        cy.get('.gradient-bg-diagonal .w-full').should('be.visible')
    });
});