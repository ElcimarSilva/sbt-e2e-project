const { layoutGrid, technicianCard, titleTopPage } = require('../elements/techniciansElements');
const { CYPRESS_THE_VOICE_BASE_URL } = require('../constants/utils');
class TechniciansPage {
  visit() {
    cy.visit(CYPRESS_THE_VOICE_BASE_URL + '/tecnicos');
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
