const homePage = require("../../support/pages/homePage");
const { CYPRESS_SBT_TV_BASE_URL } = require("../../support/constants/utils");
describe("Smoke tests on home page SBT TV", { tags: ["@smoke"] }, () => {
  beforeEach(() => {
    homePage.visit();
    cy.waitForPage(2000);
  });

  it("Home - deve verificar os principais elementos", () => {
    // Seções principais visíveis
    homePage.getImageMainContainer().should("be.visible");

    // Últimas Notícias presente com múltiplos cards
    homePage.getNewsCards().should("be.visible").should("have.length.gte", 4);

    // 'Agora no SBT' com botão Ao vivo e 'Ver tudo'
    cy.contains("section", "Agora no SBT")
      .should("be.visible")
      .within(() => {
        cy.get('[data-testid="live-button"]').should("be.visible");
        cy.get('[data-testid="see-more-button"]').should("be.visible");
      });

    // 'Mais lidas' lateral presente
    cy.contains("section", "Mais lidas")
      .should("be.visible")
      .within(() => {
        cy.get("li a").its("length").should("be.gte", 3);
      });
  });

  it("Home - deve exibir título no destaque", () => {
    homePage.getBannerTitle().should("be.visible").and("not.be.empty");
  });

  it("Home - deve abrir uma notícia ao clicar em 'Mais lidas'", () => {
    // Usa os links confiáveis da seção 'Mais lidas'
    homePage
      .getAllNews()
      .first()
      .should("have.attr", "href")
      .then((href) => {
        cy.wrap(href).should("include", "/noticia/");
      });
    homePage.clickFirstNewsImage();
    cy.url().should("include", "/noticia/");
    cy.get("h1").should("be.visible");
  });

  it("Home - deve listar vídeos em 'Vídeos em alta'", () => {
    homePage
      .getVideoSession()
      .should("be.visible")
      .within(() => {
        cy.get("a")
          .should("have.attr", "href")
          .and("match", /\/videos\?video=/);
      });
  });

  it("Home - deve abrir a politica de privacidade", () => {
    cy.intercept("GET", "**/politica-de-privacidade").as("getPolicy");
    cy.intercept("GET", "**/content.sbt.com.br/api/medias?limit**").as(
      "getMedias",
    );
    cy.origin("https://www.sbt.com.br/politica-de-privacidade", () => {
      cy.visit("https://www.sbt.com.br/politica-de-privacidade", {
        timeout: 20000,
      });
      cy.wait("@getPolicy");
      cy.wait("@getMedias");
      cy.url().should(
        "include",
        "https://www.sbt.com.br/politica-de-privacidade",
      );
      cy.get("app-privacy-policy").should("be.visible");
      cy.get("#apolitica")
        .should("be.visible")
        .and("contain.text", "POLÍTICA DE PRIVACIDADE");
      cy.get("app-menu-header")
        .should("be.visible")
        .find("a")
        .should("have.attr", "href", "https://gruposilviosantos.com.br/");
    });
  });

  it("Home - deve abrir os termos de uso", () => {
    cy.intercept("GET", "**/termos-de-uso").as("getTerms");
    cy.origin("https://www.sbt.com.br/termos-de-uso", () => {
      cy.visit("https://www.sbt.com.br/termos-de-uso");
      cy.wait("@getTerms");
      cy.url().should("include", "https://www.sbt.com.br/termos-de-uso", {
        timeout: 20000,
      });
      cy.get('[class="cookie-banner-lgpd_button_aceitar"]')
        .should("be.visible")
        .click();
      cy.get("app-terms").should("be.visible");
      cy.get("app-terms")
        .find("strong")
        .should("be.visible")
        .and("contain.text", "TERMOS E CONDIÇÕES DE USO");
      cy.get("app-menu-header")
        .should("be.visible")
        .find("a")
        .should("have.attr", "href", "https://gruposilviosantos.com.br/");
    });
  });
});
