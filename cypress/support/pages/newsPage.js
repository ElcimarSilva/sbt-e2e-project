const { newsLabel, loadMoreNewsButton } = require('../elements/newsElements');
const { THE_VOICE_BASE_URL } = require('../constants/utils');
class NewsPage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL + '/novidades');
  }

  getNewsLabel() {
    return cy.get(newsLabel);
  }

  getLoadMoreNewsButton() {
    return cy.get(loadMoreNewsButton);
  }
}

module.exports = new NewsPage();
