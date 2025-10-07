const { layoutGrid, technicianCard } = require('../elements/techniciansElements');

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
}

module.exports = new TechniciansPage();
