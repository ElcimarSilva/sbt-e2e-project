describe("Smoke - Core Routes (staging)", { tags: ["@smoke"] }, () => {
  const paths = [
    "/",
    "/noticias",
    "/videos",
    "/programacao",
    "/programas",
    "/podcasts",
    "/inscricoes",
    "/resultados",
    "/sitemap.xml",
    "/sitemap-news.xml",
    "/sitemap-struct.xml",
  ];

  paths.forEach((p) => {
    it(`GET ${p} responds 200/3xx`, () => {
      cy.request({
        url: p,
        followRedirect: true,
        failOnStatusCode: false,
      }).then((res) => {
        expect([200, 301, 302]).to.include(res.status);
      });
    });
  });
});
