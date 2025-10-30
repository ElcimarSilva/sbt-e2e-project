
const videosPage = require('../../support/pages/videosPage');

describe('Smoke tests on videos page TheVoice', () => {

    beforeEach(() => {
        videosPage.visit();
    });

    it('Videos - deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/novidades/**').as('getNews');
        cy.intercept('GET', '**/times/**').as('getTeams');
        cy.intercept('GET', '**/videos/**').as('getVideos');


        cy.wait('@getNews').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getTeams').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getVideos').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
    });

    it('Videos - deve verificar a execução do video principal na página', () => {
    });

    it('Videos - deve verificar a sessão videos relacionados', () => {
    });

    it('Videos - deve abrir um dos videos da sessão videos relacionados e verificar sua execução', () => {
    });

    //TODO: Verificar com thiago se a pagina de videos esta pronta pois esta praticamente um cópia da home
});