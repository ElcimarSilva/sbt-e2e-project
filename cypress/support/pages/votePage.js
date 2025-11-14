const { THE_VOICE_BASE_URL } = require('../constants/utils');
class votePage {
  visit() {
    cy.visit(THE_VOICE_BASE_URL + '/vote');
  }
}
module.exports = new votePage();