
const newsPage = require('../../cypress/support/pages/newsPage');
const homePage = require('../../cypress/support/pages/homePage');

describe('Smoke tests on news page TheVoice', () => {

    beforeEach(() => {
        newsPage.visit();
    });

    it('Mobile - News - deve verificar os principais elementos', () => {
        newsPage.getNewsLabel().should('be.visible');
    });

    it('Mobile - News - deve abrir a uma noticia da sessão Veja mais ', () => {
        homePage.getSeeMoreContainer().find('article').first().scrollIntoView().should('be.visible').click()
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
        });

     it('Mobile - News - deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
        });

     it('Mobile - News - deve abrir um item da playlist ao clicar', () => {
        homePage.getPlaylistSession().should('be.visible')
            .and('contain.text', 'Playlists').and('contain.text', 'Ver tudo');
            homePage.getPlaylistSession().find('figure').first().click();
            cy.url().should('include', 'https://thevoice-dev.sbtlab.io/playlists/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
        });

        it('Mobile - News - deve carregar mais noticias ao clicar em Carregar mais', () => {
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

});
