const homePage = require('../../support/pages/homePage');

describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/novidades/**').as('getNews');
        cy.intercept('GET', '**/tecnicos/**').as('getTechnicians');
        cy.intercept('GET', '**/times/**').as('getTeams');
        cy.wait('@getNews');
        cy.wait('@getTechnicians');
        cy.wait('@getTeams');

        homePage.getHeaderSession().should('be.visible')
        homePage.getHeaderSession().should('contain.text', 'Home')
        homePage.getHeaderSession().should('contain.text', 'Novidades')
        homePage.getHeaderSession().should('contain.text', 'Técnicos')
        homePage.getHeaderSession().should('contain.text', 'Times')
        homePage.getHeaderSession().should('contain.text', 'Vídeos')
        homePage.getImageMainContainer().should('be.visible');
        homePage.getNewsCards().should('be.visible').should('have.length.gte', 4);

        homePage.getSeeMoreContainer().scrollIntoView().should('be.visible').and('contain.text', 'Veja mais');
        homePage.getSeeMoreItens().should('be.visible').and('have.length.gte', 2);
        homePage.getPlaylistSession().should('be.visible').and('contain.text', 'Playlists');
    });

    it('deve trocar o banner ao clicar na seta', () => {
        homePage.getBannerTitle().should('be.visible').should('not.be.empty');
        homePage.getFirstImageMainContainer().should('be.visible');
        homePage.clickBannerNext();
        homePage.getBannerTitle().should('be.visible').should('not.be.empty')
        homePage.getSecondImageMainContainer().should('be.visible');
    });

    it('deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
    });

    it('deve abrir um item da playlist ao clicar', () => {
        homePage.getPlaylistSession().should('be.visible')
            .and('contain.text', 'Playlists').and('contain.text', 'Ver tudo');
         homePage.getPlaylistSession().find('figure').first().click();
         cy.url().should('include', 'https://thevoice-dev.sbtlab.io/playlists/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');

    });

    it('deve verificar e abrir um video na sessão videos', () => {
        homePage.getVideoSession().should('be.visible')
        homePage.getVideoSession().find('a').and('have.attr', 'href', '/videos').and('contain.text', 'Ver tudo');
        homePage.getVideoSession().find('.snap-start').find('a').should('be.visible').and('have.attr', 'href').and('not.be.empty');
        homePage.getVideoSession().find('figure').first().should('be.visible').click();
        cy.url().should('include', 'https://thevoice-dev.sbtlab.io/videos/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
    });

    it('deve verificar o funcionamento da sessão de reels', () => {
        homePage.getReelsSession().should('be.visible')
        homePage.getReelsSession().find('h2').should('be.visible').and('contain.text', 'Reels');
        homePage.getReelsSession().find('a').should('be.visible').and('contain.text', 'Ver tudo').and('have.attr', 'href').and('not.be.empty');
        homePage.getReelsGrid().should('be.visible').find('.w-full').should('be.visible').and('have.length.gte', 4);
        homePage.getRellsCarrouselNavButtonRight().should('be.visible').click();
        homePage.getRellsCarrouselNavButtonLeft().should('be.visible');
    });

    it('deve verificar um reels', () => {
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().should('be.visible').scrollIntoView().click();
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().find('iframe').should('be.visible').and('have.attr', 'src').and('not.be.empty');
    });

    it('deve abrir o instagram ao clicar em Ver tudo', () => {
        cy.get('[href="https://www.instagram.com/thevoicebrasil"]').should('be.visible').invoke('removeAttr', 'target') // evita abrir nova aba
        .click();
        cy.url().should('include', 'https://www.instagram.com/thevoicebrasil');
    });

    it('deve abrir a politica de privacidade', () => {

    });

    it('deve abrir os termos de uso', () => {

    });
});
