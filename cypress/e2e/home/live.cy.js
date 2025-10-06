
describe('Tests on home page TheVoice', () => {

    beforeEach(() => {
        cy.visit('https://thevoice-dev.sbtlab.io/');
    });
    it('deve verificar os principais elementos', () => {
        cy.get('[class="hidden md:flex px-4 py-2 rounded-full bg-white/10 text-gray-50 text-md items-center gap-2 hover:bg-white/15 transition-colors"]').should('be.visible');

    });
});