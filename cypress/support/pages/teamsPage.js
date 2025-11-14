const {
  teamsBanner,
  filterSession,
  imageSession,
  whiteButtonFiltered,
  teamsButtonFilter,
  mobileTeamsFilter,
  mobileTeamsListFilter,
} = require('../elements/teamsElements');

const { THE_VOICE_BASE_URL } = require('../constants/utils');

class TeamsPage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL + '/times/');
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

  // mobile functions
  getMobileTeamsFilter() {
    return cy.get(mobileTeamsFilter);
  }

  getMobileTeamsListFilter() {
    return cy.get(mobileTeamsListFilter);
  }
}

module.exports = new TeamsPage();
