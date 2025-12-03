/**
 * Custom commands para chamadas de API do CMS
 */

/**
 * Busca artigos via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*' ou '?filters[isHighlight][$eq]=false')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getArticles', (queryParams = '') => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/articles${queryParams}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca categorias via API do CMS
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCategories', () => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/categories`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca coaches via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?sort=title:asc')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCoaches', (queryParams = '') => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/coaches${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca vídeos no sbt-video-uploader
 * @param {string} queryParams - Parâmetros de query string
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getVideos', (queryParams = '') => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/sbt-video-uploader/api-video-asset${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca lista de reels
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getReels', () => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/reels`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca playlists com vídeos
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getPlaylistsWithVideos', () => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/playlists-with-videos`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca singers com populate
 * @param {string} populate - Campos para popular (ex: 'Redes')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getSingers', (populate = '') => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');
    const queryParams = populate ? `?populate=${populate}` : '';

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/singers${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Busca hero-banners
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHeroBanners', (queryParams = '') => {
    const token = Cypress.env('CMS_API_TOKEN');
    const baseUrl = Cypress.env('CMS_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/hero-banners${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${token}`
        }
    });
});

/**
 * Health check da API de autenticação
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealth', () => {
    const baseUrl = Cypress.env('AUTH_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/health`,
        headers: {}
    });
});

/**
 * Health check do banco de dados
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealthDatabase', () => {
    const baseUrl = Cypress.env('AUTH_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${baseUrl}/health/database`,
        headers: {}
    });
});

