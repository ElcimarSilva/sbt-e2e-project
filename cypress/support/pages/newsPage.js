const { novidadesLabel } = require('../elements/newsElements');

class NewsPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/novidades');
  }

  getNovidadesLabel() {
    return cy.get(novidadesLabel);
  }
}

module.exports = new NewsPage();
