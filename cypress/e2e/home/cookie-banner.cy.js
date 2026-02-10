describe("Banner de cookies", () => {
  beforeEach(() => {
    // Garante que não há dados de sessão/cookies locais antes de visitar
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("deve estar visível na página inicial e ser clicável para aceitar", () => {
    // Limpa storage também no momento do carregamento da página
    cy.visit("/");

    // Aguarda o banner aparecer e verifica visibilidade
    cy.get('[aria-label="Aviso de cookies"]', { timeout: 10000 }).should(
      "be.visible",
    );

    // Verifica que o botão OK está presente e clicável
    cy.get('button[aria-label="Aceitar cookies"]').should("be.visible").click();

    // Verifica se o banner sumiu, mas protegendo contra remoção do DOM
    cy.get("body").then(($body) => {
      if ($body.find('button[aria-label="Aceitar cookies"]').length) {
        // Após clicar, garantir que o banner não existe mais ou não está visível
        cy.get('[aria-label="Aviso de cookies"]').then(($banner) => {
          if ($banner.length === 0) {
            // removido do DOM — ok
            expect($banner.length).to.equal(0);
          } else {
            // presente no DOM, deve estar invisível
            cy.wrap($banner).should("not.be.visible");
          }
        });
      } else {
        cy.log(
          "Banner ou botão não encontrado — provavelmente removido do DOM",
        );
      }
    });
  });
});
