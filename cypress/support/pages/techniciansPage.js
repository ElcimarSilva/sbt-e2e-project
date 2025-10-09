const { layoutGrid, technicianCard, titleTopPage } = require('../elements/techniciansElements');

class TechniciansPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/tecnicos');
  }

  getLayoutGrid() {
    return cy.get(layoutGrid);
  }

  getTechnicianCards() {
    return cy.get(technicianCard);
  }

  getTitleTopPage() {
    return cy.get(titleTopPage);
  }
}

module.exports = new TechniciansPage();
