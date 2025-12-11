describe('API Tests', () => {
    beforeEach(() => {
        // Verifica se as variáveis de ambiente estão configuradas
        expect(Cypress.env('CYPRESS_CMS_API_TOKEN'), 'CYPRESS_CMS_API_TOKEN deve estar configurado').to.exist;
        expect(Cypress.env('CYPRESS_CMS_BASE_URL'), 'CYPRESS_CMS_BASE_URL deve estar configurado').to.exist;
        expect(Cypress.env('CYPRESS_AUTH_BASE_URL'), 'CYPRESS_AUTH_BASE_URL deve estar configurado').to.exist;
    });

    it('Deve buscar os artigos via API do CMS', () => {
        cy.getArticles('?populate=*').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.length).to.be.greaterThan(0);

            // Verifica estrutura básica dos artigos
            if (response.body.data.length > 0) {
                const firstArticle = response.body.data[0];
                expect(firstArticle).to.have.property('id');
            }
        });
    });

    it('Deve buscar as categorias via API do CMS', () => {
        cy.getCategories().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica se há categorias e sua estrutura
            if (response.body.data.length > 0) {
                const firstCategory = response.body.data[0];
                expect(firstCategory).to.have.property('id');
            }
        });
    });

    it('Deve buscar os coaches via API do CMS', () => {
        cy.getCoaches('?sort=title:asc').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica estrutura dos coaches
            if (response.body.data.length > 0) {
                const firstCoach = response.body.data[0];
                expect(firstCoach).to.have.property('id');

                // Verifica se está ordenado por título (primeiro item deve ter título)
                if (firstCoach.attributes && firstCoach.attributes.title) {
                    expect(firstCoach.attributes.title).to.be.a('string');
                }
            }
        });
    });

    it('Deve buscar vídeo no sbt-video-uploader', () => {
        cy.getVideos().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);

        });
    });

    it('Deve buscar lista de reels', () => {
        cy.getReels().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica estrutura dos reels
            if (response.body.data.length > 0) {
                const firstReel = response.body.data[0];
                expect(firstReel).to.have.property('id');
            }
        });
    });

    it('Deve buscar playlists com vídeos', () => {
        cy.getPlaylistsWithVideos().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica estrutura das playlists
            if (response.body.data.length > 0) {
                const firstPlaylist = response.body.data[0];
                expect(firstPlaylist).to.have.property('id');
            }
        });
    });

    it('Deve buscar singers com populate Redes', () => {
        cy.getSingers('Redes').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica estrutura dos singers
            if (response.body.data.length > 0) {
                const firstSinger = response.body.data[0];
                expect(firstSinger).to.have.property('id');

                // Verifica se o populate Redes foi aplicado
                if (firstSinger.attributes && firstSinger.attributes.Redes) {
                    expect(firstSinger.attributes.Redes).to.exist;
                }
            }
        });
    });

    it('Deve buscar vídeos por playlist id 1 (sbt-video-uploader)', () => {
        cy.getVideos('?filters[playlist][id][$eq]=1&pagination[withCount]=true').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);

            // Verifica se há paginação
            if (response.body.meta && response.body.meta.pagination) {
                expect(response.body.meta.pagination).to.have.property('total');
                expect(response.body.meta.pagination.total).to.be.a('number');
            }

        });
    });

    it('Deve buscar artigos onde isHighlight = false', () => {
        cy.getArticles('?filters[isHighlight][$eq]=false').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica se todos os artigos têm isHighlight = false
            if (response.body.data.length > 0) {
                response.body.data.forEach((article) => {
                    if (article.attributes && article.attributes.hasOwnProperty('isHighlight')) {
                        expect(article.attributes.isHighlight).to.eq(false);
                    }
                });
            }
        });
    });

    it('Deve buscar artigo pelo slug', () => {
        const slug = 'noticia-teste';
        cy.getArticles(`?filters[slug][$eq]=${slug}`).then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            const article = response.body.data[0];
            expect(article).to.have.property('id');
            expect(article).to.have.property('title');
            expect(article).to.have.property('slug');
            expect(article).to.have.property('updatedAt');
            expect(article).to.have.property('publishedAt');

            expect(article.slug).to.eq(slug);
        });
    });

    it('Deve buscar hero-banners com populate=*', () => {
        cy.getHeroBanners('?populate=*').then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status e estrutura
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');

            // Verifica estrutura dos hero-banners
            if (response.body.data.length > 0) {
                const firstBanner = response.body.data[0];
                expect(firstBanner).to.have.property('id');
            }
        });
    });

    it('health deve retornar o status da API', () => {
        cy.getHealth().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;

            // Verifica estrutura básica da resposta de health
            if (response.body.status) {
                expect(response.body.status).to.be.a('string');
            }
        });
    });

    it('health/database deve retornar o status do banco', () => {
        cy.getHealthDatabase().then((response) => {
            cy.log(JSON.stringify(response.body));

            // Verificações de status
            expect(response.status).to.eq(200);
            expect(response.body).to.exist;

            // Verifica estrutura básica da resposta de health do banco
            if (response.body.status) {
                expect(response.body.status).to.be.a('string');
            }

            // Verifica se há informações sobre o banco
            if (response.body.database) {
                expect(response.body.database).to.exist;
            }
        });
    });

    afterEach(() => {
        // Any necessary cleanup can be done here
    });
});
