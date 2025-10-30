// const { layoutGrid, technicianCard, titleTopPage } = require('../elements/techniciansElements');

class videosPage {
  visit() {
    cy.visit('https://thevoice-dev.sbtlab.io/videos/');
  }
}
module.exports = new videosPage();