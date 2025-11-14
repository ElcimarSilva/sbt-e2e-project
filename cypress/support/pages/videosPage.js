const { relatedVideosItens, mainSessionVideos, carrouselNextButton, carrouselPreviousButton, secondItemOnCarrousel, firstItemOnCarrousel } = require('../elements/videosElements');
const { THE_VOICE_BASE_URL } = require('../constants/utils');
class videosPage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL + '/videos/');
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