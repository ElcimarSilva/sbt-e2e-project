const videosPage = require("../../support/pages/videosPage");
const homePage = require("../../support/pages/homePage");
const {
  classActiveCarrouselButton,
  classInactiveCarrouselButton,
} = require("../../support/elements/videosElements");
const { CYPRESS_SBT_TV_BASE_URL } = require("../../support/constants/utils");

describe("Smoke tests on videos page SBT TV", () => {
  beforeEach(() => {
    videosPage.visit();
  });

  it("Videos - deve verificar os principais elementos", () => {
    videosPage.getMainSessionVideos().should("be.visible");
    videosPage
      .getMainSessionVideos()
      .find("h1")
      .should("be.visible")
      .and("contain.text", "Vídeos");
    // validar thumbnails (img.youtube.com) em vez de um elemento custom `youtube-video`
    cy.get('img[src*="img.youtube.com"]').should("be.visible");
    cy.get('img[src*="img.youtube.com"]')
      .first()
      .should("have.attr", "src")
      .and("include", "img.youtube.com");
    // cy.get('youtube-video').should('be.visible').matchImageSnapshot();
  });

  it("Videos - deve passar os videos no carrousel", () => {
    // Interagir condicionalmente com controles do carrossel caso existam no DOM
    videosPage.getCarrouselNextButton().then(($btn) => {
      if ($btn.length) {
        cy.wrap($btn).should("be.visible").click();
        videosPage
          .getSecondItemOnCarrousel()
          .should("have.class", classActiveCarrouselButton);
        videosPage.getCarrouselPreviousButton().should("be.visible").click();
        videosPage
          .getFirstItemOnCarrousel()
          .should("have.class", classActiveCarrouselButton)
          .and("not.have.class", classInactiveCarrouselButton);
      } else {
        cy.log("carousel controls not present on this layout");
      }
    });
  });

  it("Videos - deve verificar a sessão videos relacionados", () => {
    videosPage
      .getRelatedVideosItens()
      .should("be.visible")
      .and("have.length.gte", 3);
    videosPage.getRelatedVideosItens().find("a").should("have.attr", "href");
  });

  it("Videos - deve abrir um dos videos da sessão videos relacionados e verificar sua execução", () => {
    videosPage.getRelatedVideosItens().first().should("be.visible").click();

    cy.url().should("include", CYPRESS_SBT_TV_BASE_URL + "/videos/");

    // aguardar playlist ou player; clicar em reproduzir para ativar o iframe do YouTube
    cy.get('button[aria-label^="Reproduzir"]', { timeout: 5000 }).then(
      ($btn) => {
        if ($btn.length) cy.wrap($btn.first()).click({ force: true });
        else cy.log("play button not present, maybe player already loaded");
      },
    );

    // verificar iframe do YouTube (inserido após reprodução) — incluir timeout pois pode demorar
    cy.get('iframe[src*="youtube.com/embed"]', {
      includeShadowDom: true,
      timeout: 10000,
    })
      .should("exist")
      .and("have.attr", "src")
      .and("include", "enablejsapi=1");

    cy.get('iframe[src*="youtube.com/embed"]', {
      includeShadowDom: true,
    }).should("be.visible");
  });
});

describe("YouTube Player - Renderização", () => {
  it("Deve exibir o iframe do YouTube corretamente", () => {
    videosPage.visit();

    // clicar em reproduzir para garantir que o player seja injetado
    cy.get('button[aria-label^="Reproduzir"]', { timeout: 5000 }).then(
      ($btn) => {
        if ($btn.length) cy.wrap($btn.first()).click({ force: true });
        else cy.log("play button not present, maybe player already loaded");
      },
    );

    cy.get('iframe[src*="youtube.com/embed"]', {
      includeShadowDom: true,
      timeout: 10000,
    })
      .should("exist")
      .and("have.attr", "src")
      .and("include", "enablejsapi=1");

    cy.get('iframe[src*="youtube.com/embed"]', {
      includeShadowDom: true,
    }).should("be.visible");
  });
});
