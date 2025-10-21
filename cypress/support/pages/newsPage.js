const { newsLabel, loadMoreNewsButton } = require('../elements/newsElements');

class NewsPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/novidades');
  }

  getNewsLabel() {
    return cy.get(newsLabel);
  }

  getLoadMoreNewsButton() {
    return cy.get(loadMoreNewsButton);
  }
}

module.exports = new NewsPage();
