
describe('Smoke tests on technicians page TheVoice', () => {

    beforeEach(() => {
        cy.visit('https://thevoice-dev.sbtlab.io/tecnicos');
    });
    it('deve verificar os principais elementos', () => {
        cy.get('[class="grid grid-cols-1 sm:landscape:grid-cols-2 gap-8 md:gap-16 md:p-4 xl:p-0"]').should('be.visible');
        cy.get('[class="flex flex-col gap-2 rounded-lg shadow-lg"]').should('have.length', 4);
        cy.get('[class="grid grid-cols-1 sm:landscape:grid-cols-2 gap-8 md:gap-16 md:p-4 xl:p-0"]').should('contain.text', 'Tecnicos');
        cy.get('[class="grid grid-cols-1 sm:landscape:grid-cols-2 gap-8 md:gap-16 md:p-4 xl:p-0"]').should('have.a.property', 'h1');
    });
});