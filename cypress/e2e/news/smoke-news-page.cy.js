
const newsPage = require('../../support/pages/newsPage');
const homePage = require('../../support/pages/homePage');
const { CYPRESS_THE_VOICE_BASE_URL } = require('../../support/constants/utils');
describe('Smoke tests on news page TheVoice', () => {

    beforeEach(() => {
        newsPage.visit();
    });

    it('News - deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/tecnicos/**').as('getTechnicians');
        cy.intercept('GET', '**/times/**').as('getTeams');
        cy.intercept('GET', '**/videos/**').as('getVideos');
        cy.wait('@getTechnicians').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getTeams').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        cy.wait('@getVideos').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
        newsPage.getNewsLabel().should('be.visible');

    });

    it('News - deve abrir a uma noticia da sessão Veja mais ', () => {
        homePage.getSeeMoreContainer().find('article').first().scrollIntoView().should('be.visible').click()
        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
        });

     it('News - deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
        });

     it('News - deve abrir um item da playlist ao clicar', () => {
        homePage.getPlaylistSession().should('be.visible')
            .and('contain.text', 'Playlists').and('contain.text', 'Ver tudo');
            homePage.getPlaylistSession().find('figure').first().click();
            cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/playlists/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
        });

        it('News - deve carregar mais noticias ao clicar em Carregar mais', () => {
            homePage.getAllNews().should('have.length.lte', 15);
            cy.intercept('GET', '**/noticias/**').as('getNews');
            cy.wait('@getNews').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });

            newsPage.getLoadMoreNewsButton().scrollIntoView().should('be.visible').click();
            cy.wait('@getNews').should((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });
            homePage.getAllNews().should('have.length.gte', 20);
        });

        it.skip('News - deve verificar a existencia da tag na noticia', () => {
        });
});
