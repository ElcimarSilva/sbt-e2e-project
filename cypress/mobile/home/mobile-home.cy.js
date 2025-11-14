const homePage = require('../../support/pages/homePage');
const { THE_VOICE_BASE_URL } = require('../../support/constants/utils');

describe('Mobile - Tests on home page TheVoice', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('Mobile - Home - deve verificar o menu de hamburger', () => {
        homePage.getBurgerHomeButton().should('be.visible').click();
        homePage.getBurgerMenuContainer().should('be.visible');
        homePage.getBurgerMenuContainer().find('a').should('have.attr', 'href').and('contain', '/');
        homePage.getBurgerMenuContainer().find('a').eq('1').should('have.attr', 'href').and('contain', '/novidades');
        homePage.getBurgerMenuContainer().find('a').eq('2').should('have.attr', 'href').and('contain', '/tecnicos');
        homePage.getBurgerMenuContainer().find('a').eq('3').should('have.attr', 'href').and('contain', '/times');
        homePage.getBurgerMenuContainer().find('a').eq('4').should('have.attr', 'href').and('contain', '/videos');
        homePage.getBurgerMenuContainer().contains('Ao vivo').should('be.visible');
        homePage.getBurgerMenuContainer().matchImageSnapshot('burger-menu-mobile');
        homePage.getBurgerHomeButton().should('be.visible').click();
    });

    it('Mobile - Home - deve verificar os principais elementos', () => {
        cy.get('.gradient-bg-horizontal').should('be.visible')
        homePage.getSeeMoreContainer().scrollIntoView().should('be.visible').and('contain.text', 'Veja mais');
        homePage.getSeeMoreItens().should('be.visible').and('have.length.gte', 2);
        homePage.getPlaylistSession().should('be.visible').and('contain.text', 'Playlists');
        homePage.getNewsCards().should('be.visible').should('have.length.gte', 4);
    });


    it('Mobile - Home - deve abrir a uma noticia da sessão Veja mais ', () => {
        homePage.getSeeMoreContainer().find('article').first().scrollIntoView().should('be.visible').click()
        cy.url().should('include', THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Mobile - Home - deve abrir a noticia ao clicar no card', () => {
        homePage.clickFirstNewsImage();
        cy.url().should('include', THE_VOICE_BASE_URL + '/noticias/');
        homePage.getSessionNews().should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('span').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h1').should('be.visible').and('not.be.empty');
        homePage.getSessionNews().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Mobile - Home - deve abrir um item da playlist ao clicar', () => {
        homePage.getPlaylistSession().should('be.visible')
            .and('contain.text', 'Playlists').and('contain.text', 'Ver tudo');
         homePage.getPlaylistSession().find('figure').first().click();
         cy.url().should('include', THE_VOICE_BASE_URL + '/playlists/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Mobile - Home - deve verificar e abrir um video na sessão videos', () => {
        homePage.getVideoSession().should('be.visible')
        homePage.getVideoSession().find('a').and('have.attr', 'href', '/videos').and('contain.text', 'Ver tudo');
        homePage.getVideoSession().find('.snap-start').find('a').should('be.visible').and('have.attr', 'href').and('not.be.empty');
        homePage.getVideoSession().find('figure').first().should('be.visible').click();
        cy.url().should('include', THE_VOICE_BASE_URL + '/videos/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
    });

    it('Mobile - Home - deve verificar o funcionamento da sessão de reels', () => {
        homePage.getReelsSession().should('be.visible')
        homePage.getReelsSession().find('h2').should('be.visible').and('contain.text', 'Reels');
        homePage.getReelsSession().find('a').should('be.visible').and('contain.text', 'Ver tudo').and('have.attr', 'href').and('not.be.empty');
        homePage.getReelsGrid().should('be.visible').find('.w-full').should('be.visible').and('have.length.gte', 4);
    });

    it('Mobile - Home - deve verificar um reels', () => {
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().should('be.visible').scrollIntoView().click();
        homePage.getReelsGrid().should('be.visible').find('.w-full').first().find('iframe').should('be.visible').and('have.attr', 'src').and('not.be.empty');
    });

    it('Mobile - Home - deve abrir o instagram ao clicar em Ver tudo', () => {
        cy.get('[href="https://www.instagram.com/thevoicebrasil"]').should('be.visible').invoke('removeAttr', 'target') // evita abrir nova aba
        .click();
        cy.url().should('include', 'https://www.instagram.com/thevoicebrasil', { timeout: 10000 });
    });

    it('Mobile - Home - deve abrir a politica de privacidade', () => {
        cy.intercept('GET', '**/politica-de-privacidade').as('getPolicy')
        cy.intercept('GET', '**/content.sbt.com.br/api/medias?limit**').as('getMedias')
        cy.visit('https://www.sbt.com.br/politica-de-privacidade');
        cy.origin('https://www.sbt.com.br/politica-de-privacidade', () => {
            cy.wait('@getPolicy')
            cy.wait('@getMedias')
            cy.url().should('include', 'https://www.sbt.com.br/politica-de-privacidade');
            cy.get('app-privacy-policy').should('be.visible');
            cy.get('#apolitica').should('be.visible').and('contain.text', 'POLÍTICA DE PRIVACIDADE');
            cy.get('app-menu-header').should('be.visible').find('a').should('have.attr', 'href', 'https://gruposilviosantos.com.br/');
        })
    });

    it('Mobile - Home - deve abrir os termos de uso', () => {
        cy.intercept('GET', '**/termos-de-uso').as('getTerms')
        cy.visit('https://www.sbt.com.br/termos-de-uso');
        cy.origin('https://www.sbt.com.br/termos-de-uso', () => {
            cy.wait('@getTerms')
            cy.url().should('include', 'https://www.sbt.com.br/termos-de-uso');
            cy.get('[class="cookie-banner-lgpd_button_aceitar"]').should('be.visible').click();
            cy.get('app-terms').should('be.visible');
            cy.get('app-terms').find('strong').should('be.visible').and('contain.text', 'TERMOS E CONDIÇÕES DE USO');
            cy.get('app-menu-header').should('be.visible').find('a').should('have.attr', 'href', 'https://gruposilviosantos.com.br/');
        })
    });
});