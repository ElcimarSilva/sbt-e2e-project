const {
  teamsBanner,
  filterSession

} = require('../elements/teamsElements');

class TeamsPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/times/');
  }

  getTeamsBanner() {
    return cy.get(teamsBanner);
  }

  getFilterSession() {
    return cy.get(filterSession);
  }
}

module.exports = new TeamsPage();
