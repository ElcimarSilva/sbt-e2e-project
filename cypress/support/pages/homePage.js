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
  liveButton
} = require('../elements/homeElements');

class HomePage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/');
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
}

module.exports = new HomePage();
