const homePage = require('../../support/pages/homePage');
const { CYPRESS_THE_VOICE_BASE_URL } = require('../../support/constants/utils');
describe('Smoke tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('Home - deve verificar os principais elementos', () => {
        cy.intercept('GET', '**/novidades/?_rsc=tujbn').as('getNews');
        cy.intercept('GET', '**/tecnicos/?_rsc=tujbn').as('getTechnicians');
        cy.intercept('GET', '**/times/?_rsc=tujbn').as('getTeams');
        cy.intercept('GET', '**/videos/?_rsc=tujbn').as('getVideos');
        cy.wait('@getNews');
        cy.wait('@getTechnicians');
        cy.wait('@getTeams');
        cy.wait('@getVideos')

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

    it('Home - deve trocar o banner ao clicar na seta', () => {
        homePage.getBannerTitle().should('be.visible').should('not.be.empty');
        homePage.getFirstImageMainContainer().should('be.visible');
        homePage.clickBannerNext();
        homePage.getBannerTitle().should('be.visible').should('not.be.empty')
        homePage.getSecondImageMainContainer().should('be.visible');
    });

    it('Home - deve abrir a uma noticia da sessão Veja mais ', () => {
        homePage.getSeeMoreContainer().find('article').first().scrollIntoView().should('be.visible').click()
        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Home - deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Home - deve abrir um item da playlist ao clicar', () => {
        homePage.getPlaylistSession().should('be.visible')
            .and('contain.text', 'Playlists').and('contain.text', 'Ver tudo');
         homePage.getPlaylistSession().find('figure').first().click();
         cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/playlists/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Home - deve verificar e abrir um video na sessão videos', () => {
        homePage.getVideoSession().should('be.visible')
        homePage.getVideoSession().find('a').and('have.attr', 'href', '/videos').and('contain.text', 'Ver tudo');
        homePage.getVideoSession().find('.snap-start').find('a').should('be.visible').and('have.attr', 'href').and('not.be.empty');
        homePage.getVideoSession().find('figure').first().should('be.visible').click();
        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/videos/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Home - deve verificar o funcionamento da sessão de reels', () => {
        homePage.getReelsSession().should('be.visible')
        homePage.getReelsSession().find('h2').should('be.visible').and('contain.text', 'Reels');
        homePage.getReelsSession().find('a').should('be.visible').and('contain.text', 'Ver tudo').and('have.attr', 'href').and('not.be.empty');
        homePage.getReelsGrid().should('be.visible').find('.w-full').should('be.visible').and('have.length.gte', 4);
        homePage.getRellsCarrouselNavButtonRight().should('be.visible').click();
        homePage.getRellsCarrouselNavButtonLeft().should('be.visible');
    });

    it('Home - deve verificar um reels', () => {
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().should('be.visible').scrollIntoView().click();
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().find('iframe').should('be.visible').and('have.attr', 'src').and('not.be.empty');
    });

    it('Home - deve abrir o instagram ao clicar em Ver tudo', () => {
        cy.get('[href="https://www.instagram.com/thevoicebrasil"]').should('be.visible').invoke('removeAttr', 'target') // evita abrir nova aba
        .click();
        cy.url().should('include', 'https://www.instagram.com/thevoicebrasil', { timeout: 20000 });
    });

    it('Home - deve abrir a politica de privacidade', () => { //TODO: erro to new page load
        cy.intercept('GET', '**/politica-de-privacidade').as('getPolicy')
        cy.intercept('GET', '**/content.sbt.com.br/api/medias?limit**').as('getMedias')
        cy.origin('https://www.sbt.com.br/politica-de-privacidade', () => {
            cy.visit('https://www.sbt.com.br/politica-de-privacidade', { timeout: 20000 });
            cy.wait('@getPolicy')
            cy.wait('@getMedias')
            cy.url().should('include', 'https://www.sbt.com.br/politica-de-privacidade');
            cy.get('app-privacy-policy').should('be.visible');
            cy.get('#apolitica').should('be.visible').and('contain.text', 'POLÍTICA DE PRIVACIDADE');
            cy.get('app-menu-header').should('be.visible').find('a').should('have.attr', 'href', 'https://gruposilviosantos.com.br/');
        })

    });

    it('Home - deve abrir os termos de uso', () => { //TODO: erro to new page load
        cy.intercept('GET', '**/termos-de-uso').as('getTerms')
        cy.origin('https://www.sbt.com.br/termos-de-uso', () => {
            cy.visit('https://www.sbt.com.br/termos-de-uso');
            cy.wait('@getTerms')
            cy.url().should('include', 'https://www.sbt.com.br/termos-de-uso', { timeout: 20000 });
            cy.get('[class="cookie-banner-lgpd_button_aceitar"]').should('be.visible').click();
            cy.get('app-terms').should('be.visible');
            cy.get('app-terms').find('strong').should('be.visible').and('contain.text', 'TERMOS E CONDIÇÕES DE USO');
            cy.get('app-menu-header').should('be.visible').find('a').should('have.attr', 'href', 'https://gruposilviosantos.com.br/');
        })
    });
});
