const {
  heroContainer,
  newsCard,
  bannerTitle,
  bannerNext,
  firstNewsImageAlt,
} = require('../elements/homeElements');

class HomePage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/');
  }

  getHeroContainer() {
    return cy.get(heroContainer);
  }

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
}

module.exports = new HomePage();
