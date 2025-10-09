const {
  imageMainContainer,
  newsCard,
  bannerTitle,
  bannerNext,
  firstNewsImageAlt,
  seeMoreContainer,
  seeMoreItens,
  playlistSession
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
    return cy.get(firstNewsImageAlt).first().click();
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
}

module.exports = new HomePage();
