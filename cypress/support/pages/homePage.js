const {
  imageMainContainer,
  newsCard,
  bannerTitle,
  allNews,
  seeMoreItens,
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

const { CYPRESS_THE_VOICE_BASE_URL } = require('../constants/utils');

class HomePage {
  visit() {
    cy.visit(CYPRESS_THE_VOICE_BASE_URL, { timeout: 20000 });
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

  clickFirstNewsImage() {
    return cy.get(allNews).first().click();
  }

  getAllNews() {
    return cy.get(allNews);
  }

  getSeeMoreItens() {
    return cy.get(seeMoreItens);
  }

  getFirstImageMainContainer() {
    return cy.get(imageMainContainer);
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
