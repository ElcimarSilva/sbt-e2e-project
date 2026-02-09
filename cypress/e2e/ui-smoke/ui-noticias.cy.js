describe("UI Smoke - Notícias (staging)", { tags: ["@ui-smoke"] }, () => {
  it("List section exists and has at least one link", () => {
    cy.visit("/noticias");
    cy.waitForPage();
    cy.get('[aria-label="Notícias"]')
      .should("exist")
      .within(() => {
        cy.get("a[href]").its("length").should("be.greaterThan", 0);
      });
  });
});
