describe("UI Smoke - Notícias (staging)", { tags: ["@ui-smoke"] }, () => {
  it("List section exists and has at least one news entry", () => {
    cy.visit("/noticias");
    cy.viewport(1440, 900);
    cy.waitForPage(3000);
    cy.scrollTo("bottom");
    cy.wait(400);
    cy.scrollTo("top");

    // Tenta localizar a área de listagem por aria ou role de feed
    cy.get('[aria-label="Notícias"], [role="feed"], main')
      .first()
      .should("exist");

    // Validação por conteúdo (muitos cards usam onClick em article/role=button)
    cy.contains("h1,h2", /not[íi]cias/i, { timeout: 20000 }).should(
      "be.visible",
    );
    cy.get('article, [role="feed"] article, [role="button"]', {
      timeout: 30000,
    })
      .its("length")
      .should("be.gte", 1);
    // Se disponível, títulos de cards
    cy.get('article h3, [role="button"] h3', { timeout: 30000 })
      .first()
      .should("be.visible")
      .and(($el) => expect($el.text().trim()).to.have.length.greaterThan(0));
  });
});
