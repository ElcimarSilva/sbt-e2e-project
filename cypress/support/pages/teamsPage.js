const {
  teamsBanner,
  filterSession,
  imageSession,
  whiteButtonFiltered,
  teamsButtonFilter
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

  getImageSession() {
    return cy.get(imageSession);
  }

  getWhiteButtonFiltered() {
    return cy.get(whiteButtonFiltered);
  }

  getTeamsButtonFilter() {
    return cy.get(teamsButtonFilter);
  }
}

module.exports = new TeamsPage();
