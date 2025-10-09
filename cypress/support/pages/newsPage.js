const { newsLabel } = require('../elements/newsElements');

class NewsPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/novidades');
  }

  getNewsLabel() {
    return cy.get(newsLabel);
  }
}

module.exports = new NewsPage();
