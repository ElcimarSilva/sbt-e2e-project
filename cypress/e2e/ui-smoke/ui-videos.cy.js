describe("UI Smoke - Vídeos (staging)", { tags: ["@ui-smoke"] }, () => {
  it("Main videos section exists and has at least one link", () => {
    cy.visit("/videos");
    cy.waitForPage();
    cy.get('[aria-label="Vídeos"]')
      .should("exist")
      .within(() => {
        cy.get("a[href]").its("length").should("be.greaterThan", 0);
      });
  });
});
