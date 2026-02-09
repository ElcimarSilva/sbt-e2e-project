const { newsLabel, loadMoreNewsButton } = require("../elements/newsElements");
class NewsPage {
  visit() {
    cy.visit("/noticias");
  }

  getNewsLabel() {
    return cy.get(newsLabel);
  }

  getLoadMoreNewsButton() {
    return cy.get(loadMoreNewsButton);
  }
}

module.exports = new NewsPage();
