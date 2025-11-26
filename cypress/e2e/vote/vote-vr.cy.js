const votePage = require('../../support/pages/votePage');

describe('Visual regression tests on vote page TheVoice', () => {

    beforeEach(() => {
        votePage.visit();
    });

    it.skip('Vote - deve realizar a regressão visual da pagina inicial', () => {
        cy.intercept('GET', '**/tecnicos/?_rsc=o1sbc').as('getTechnicians');
        cy.intercept('GET', '**/novidades/?_rsc=o1sbc').as('getNews');
        cy.intercept('GET', '**/times/?_rsc=o1sbc').as('getTeams');
        cy.intercept('GET', '**/videos/?_rsc=o1sbc').as('getVideos');
        cy.wait('@getTechnicians');
        cy.wait('@getNews');
        cy.wait('@getTeams');
        cy.wait('@getVideos');
        cy.wait(3000)
        cy.get('[alt="Fundo de votação"]').should('be.visible')
        cy.get('[alt="Fundo de votação"]').matchImageSnapshot('primeiro elemento');
        cy.get('[class="bg-[#111] text-white px-6 md:px-12 py-10 md:py-12"]').should('be.visible')
        cy.get('[class="bg-[#111] text-white px-6 md:px-12 py-10 md:py-12"]').matchImageSnapshot('segundo elemento');
        cy.get('button').contains('Thiago').should('be.visible').click();
        cy.wait(3000)
         cy.get('[alt="Fundo de votação"]').should('be.visible')
        cy.get('[alt="Fundo de votação"]').matchImageSnapshot('terceiro elemento');
        cy.get('[class="bg-[#111] text-white px-6 md:px-12 py-10 md:py-12"]').should('be.visible')
        cy.get('[class="bg-[#111] text-white px-6 md:px-12 py-10 md:py-12"]').matchImageSnapshot('quarto elemento');
    });
});