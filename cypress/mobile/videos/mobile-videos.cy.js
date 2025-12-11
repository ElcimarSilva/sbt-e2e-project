
const videosPage = require('../../support/pages/videosPage');
const homePage = require('../../support/pages/homePage');
const { classActiveCarrouselButton, classInactiveCarrouselButton } = require('../../support/elements/videosElements');
const { CYPRESS_THE_VOICE_BASE_URL } = require('../../support/constants/utils');

describe('Smoke tests on videos page TheVoice', () => {

    beforeEach(() => {
        videosPage.visit();
    });

    it('Videos - deve verificar os principais elementos', () => {
        videosPage.getMainSessionVideos().should('be.visible');
        videosPage.getMainSessionVideos().find('h1').should('be.visible').and('contain.text', 'Vídeos');
        cy.get('youtube-video').should('be.visible');
        cy.get('youtube-video').should('have.attr', 'src').and('include', 'youtube.com');
        // cy.get('youtube-video').should('be.visible').matchImageSnapshot();
    });

    it('Videos - deve passar os videos no carrousel', () => {
      videosPage.getCarrouselNextButton().should('exist').and('be.visible').click();
      videosPage.getSecondItemOnCarrousel().should('have.class', classActiveCarrouselButton);
      videosPage.getCarrouselPreviousButton().should('exist').and('be.visible').click();
      videosPage.getFirstItemOnCarrousel().should('have.class', classActiveCarrouselButton).and('not.have.class', classInactiveCarrouselButton);
    });

    it('Videos - deve verificar a sessão videos relacionados', () => {
        videosPage.getRelatedVideosItens().should('be.visible').and('have.length.gte', 6);
        videosPage.getRelatedVideosItens().find('a').should('have.attr', 'href');
    });

    it('Videos - deve abrir um dos videos da sessão videos relacionados e verificar sua execução', () => {
        videosPage.getRelatedVideosItens().first().should('be.visible').click();

        cy.url().should('include', CYPRESS_THE_VOICE_BASE_URL + '/videos/');
        homePage.getVideoSessionPlaylist().should('be.visible')
        homePage.getVideoSessionPlaylist().find('youtube-video').should('be.visible').and('have.attr', 'src');
        homePage.getVideoSessionPlaylist().find('h2').should('be.visible').and('not.be.empty');
        //verificar execução do video

        cy.get('iframe[src*="youtube.com/embed"]', { includeShadowDom: true })
            .should('exist')
            .and('have.attr', 'src')
            .and('include', 'enablejsapi=1');

        cy.get('iframe[src*="youtube.com/embed"]', { includeShadowDom: true })
            .should('be.visible');
    });
});

describe('YouTube Player - Renderização', () => {
  it('Deve exibir o iframe do YouTube corretamente', () => {
    videosPage.visit();

    cy.get('iframe[src*="youtube.com/embed"]', { includeShadowDom: true })
      .should('exist')
      .and('have.attr', 'src')
      .and('include', 'enablejsapi=1');

    cy.get('iframe[src*="youtube.com/embed"]', { includeShadowDom: true })
      .should('be.visible');
  });
});

