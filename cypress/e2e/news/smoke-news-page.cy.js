
describe('Smoke tests on news page TheVoice', () => {

    beforeEach(() => {
        cy.visit('https://thevoice-dev.sbtlab.io/novidades');
    });
    it('deve verificar os principais elementos', () => {
        cy.get('[aria-label="Novidades"]').should('be.visible');
        // cy.get('[class="border-b border-white/10 pb-6 last:border-0 last:pb-0').should('be.visible');

    });
});