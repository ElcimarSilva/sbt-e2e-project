
describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        cy.visit('https://thevoice-dev.sbtlab.io/');
    });
    it('deve verificar os principais elementos', () => {
        cy.get('[class="w-full flex-1 order-1 mobile-landscape:order-2 md:order-2 relative"]').should('be.visible');
        cy.get('[class="border-b border-white/10 pb-6 last:border-0 last:pb-0"').should('be.visible').should('have.length.gte', 4);
    });


    it('deve trocar o banner ao clicar na seta', () => {
       cy.get('[class="w-full flex items-center text-white text-lg mobile-landscape:max-h-30 mobile-landscape:min-h-30 h-30 min-h-30 md:text-2xl font-semibold leading-tight overflow-hidden max-h-64"').should('be.visible').should('contain.text', 'SBT anunciam os técnicos e confirmam Tiago');
       cy.get('.banner [aria-label="Próximo"]').should('be.visible').click();
       cy.get('[class="w-full flex items-center text-white text-lg mobile-landscape:max-h-30 mobile-landscape:min-h-30 h-30 min-h-30 md:text-2xl font-semibold leading-tight overflow-hidden max-h-64"').should('be.visible').should('contain.text', 'Teste banner 2');
    });

    it.only('deve abrir a noticia ao clicar no card', () => {
        cy.get('[alt="Técnicos do The Voice Brasil no SBT: carisma é suficiente?"]').first().should('be.visible').click();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/tecnicos-do-the-voice-brasil-no-sbt-carisma-e-suficiente');
    });
});