const CMS_API_TOKEN =  Cypress.env('CMS_API_TOKEN');
const CMS_BASE_URL = Cypress.env('CMS_BASE_URL');
const AUTH_BASE_URL = Cypress.env('AUTH_BASE_URL');

/**
 * Custom commands para chamadas de API do CMS
 */

/**
 * Busca artigos via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*' ou '?filters[isHighlight][$eq]=false')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getArticles', (queryParams = '') => {
    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/articles${queryParams}`,
        headers: {
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca categorias via API do CMS
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCategories', () => {
    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/categories`,
        headers: {
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca coaches via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?sort=title:asc')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCoaches', (queryParams = '') => {

    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/coaches${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca vídeos no sbt-video-uploader
 * @param {string} queryParams - Parâmetros de query string
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getVideos', (queryParams = '') => {
    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/sbt-video-uploader/api-video-asset${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca lista de reels
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getReels', () => {
    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/reels`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca playlists com vídeos
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getPlaylistsWithVideos', () => {

    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/playlists-with-videos`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca singers com populate
 * @param {string} populate - Campos para popular (ex: 'Redes')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getSingers', (populate = '') => {
    const queryParams = populate ? `?populate=${populate}` : '';

    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/singers${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca hero-banners
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHeroBanners', (queryParams = '') => {

    return cy.request({
        method: 'GET',
        url: `${CMS_BASE_URL}/hero-banners${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CMS_API_TOKEN}`
        }
    });
});

/**
 * Health check da API de autenticação
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealth', () => {

    return cy.request({
        method: 'GET',
        url: `${AUTH_BASE_URL}/health`,
        headers: {}
    });
});

/**
 * Health check do banco de dados
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealthDatabase', () => {

    return cy.request({
        method: 'GET',
        url: `${AUTH_BASE_URL}/health/database`,
        headers: {}
    });
});

