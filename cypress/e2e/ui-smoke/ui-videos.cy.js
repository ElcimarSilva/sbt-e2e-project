describe("UI Smoke - Vídeos (staging)", { tags: ["@ui-smoke"] }, () => {
  it("Videos page renders and lists at least one video item", () => {
    cy.visit("/videos");
    cy.viewport(1440, 900);
    cy.waitForPage(3000);
    cy.scrollTo("bottom");
    cy.wait(400);
    cy.scrollTo("top");

    // Procura por heading ou rótulo textual (pode estar oculto em layouts CSR/tabs)
    cy.contains("h1,h2,span,div", /v[íi]deos/i, { timeout: 20000 }).should(
      "exist",
    );

    // Itens de vídeo podem ser cards clicáveis sem <a>; cobrir múltiplos padrões
    cy.get(
      '[data-testid="on-screen-card"], [data-testid="video-flag"], a[href*="/videos?video="], img[src*="i.ytimg.com"]',
      { timeout: 30000 },
    )
      .its("length")
      .should("be.gte", 1);
  });
});
