
describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        cy.visit('https://thevoice-dev.sbtlab.io/');
    });
    it('deve verificar os principais elementos', () => {
        cy.get('[class="w-full flex-1 order-1 mobile-landscape:order-2 md:order-2 relative"]').should('be.visible');
        cy.get('[class="border-b border-white/10 pb-6 last:border-0 last:pb-0"').should('be.visible');
        
    });
});