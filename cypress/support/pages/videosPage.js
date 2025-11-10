const { relatedVideosItens, mainSessionVideos, carrouselNextButton, carrouselPreviousButton, secondItemOnCarrousel, firstItemOnCarrousel } = require('../elements/videosElements');

class videosPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/videos/');
  }

  getRelatedVideosItens() {
    return cy.get(relatedVideosItens);
  }

  getMainSessionVideos() {
    return cy.get(mainSessionVideos);
  }

  getCarrouselNextButton() {
    return cy.get(carrouselNextButton);
  }

  getCarrouselPreviousButton() {
    return cy.get(carrouselPreviousButton);
  }

  getSecondItemOnCarrousel() {
    return cy.get(secondItemOnCarrousel);
  }

  getFirstItemOnCarrousel() {
    return cy.get(firstItemOnCarrousel);
  }

}
module.exports = new videosPage();