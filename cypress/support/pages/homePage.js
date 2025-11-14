const {
  imageMainContainer,
  firstImageMainContainer,
  secondImageMainContainer,
  newsCard,
  bannerTitle,
  bannerNext,
  allNews,
  seeMoreContainer,
  seeMoreItens,
  playlistSession,
  newsSession,
  videoSessionPlaylist,
  videoSession,
  reelsGrid,
  rellsCarrouselNavButtonLeft,
  rellsCarrouselNavButtonRight,
  headerSession,
  liveButton,
  burgerHomeButton,
  burgerMenuContainer
} = require('../elements/homeElements');

const { THE_VOICE_BASE_URL } = require('../constants/utils');

class HomePage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL);
  }

  getImageMainContainer() {
    return cy.get(imageMainContainer);
  };

  getNewsCards() {
    return cy.get(newsCard);
  }

  getBannerTitle() {
    return cy.get(bannerTitle);
  }

  clickBannerNext() {
    return cy.get(bannerNext).click();
  }

  clickFirstNewsImage() {
    return cy.get(allNews).first().click();
  }

  getAllNews() {
    return cy.get(allNews);
  }

  getSeeMoreContainer() {
    return cy.get(seeMoreContainer);
  }

  getSeeMoreItens() {
    return cy.get(seeMoreItens);
  }

  getPlaylistSession() {
    return cy.get(playlistSession);
  }

  getFirstImageMainContainer() {
    return cy.get(firstImageMainContainer);
  }

  getSecondImageMainContainer() {
    return cy.get(secondImageMainContainer);
  }

  getSessionNews() {
    return cy.get(newsSession);
  }

  getVideoSessionPlaylist() {
    return cy.get(videoSessionPlaylist);
  }

  getVideoSession() {
    return cy.get(videoSession).first();
  }

  getReelsSession() {
    return cy.get(videoSession).last();
  }

  getReelsGrid() {
    return cy.get(reelsGrid);
  }

  getRellsCarrouselNavButtonLeft() {
    return cy.get(rellsCarrouselNavButtonLeft);
  }

  getRellsCarrouselNavButtonRight() {
    return cy.get(rellsCarrouselNavButtonRight);
  }

  getHeaderSession() {
    return cy.get(headerSession).find('nav a');
  }

  getLiveButton() {
    return cy.get(liveButton);
  }

  // mobile functions
  getBurgerHomeButton() {
    return cy.get(burgerHomeButton);
  }

  getBurgerMenuContainer() {
    return cy.get(burgerMenuContainer);
  }
}

module.exports = new HomePage();
