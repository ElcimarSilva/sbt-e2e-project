const { layoutGrid, technicianCard, titleTopPage } = require('../elements/techniciansElements');
const { THE_VOICE_BASE_URL } = require('../constants/utils');
class TechniciansPage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL + '/tecnicos');
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
