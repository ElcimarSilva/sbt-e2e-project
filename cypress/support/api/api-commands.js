// Função helper para obter variáveis de ambiente com validação
const getEnvVar = (varName, required = true) => {
	const value = Cypress.env(varName);
	if (required && !value) {
		throw new Error(`Variável de ambiente ${varName} não está configurada. Verifique cypress.env.json ou variáveis de ambiente do sistema (CYPRESS_${varName})`);
	}
	return value;
};

/**
 * Custom commands para chamadas de API do CMS
 */

/**
 * Busca artigos via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*' ou '?filters[isHighlight][$eq]=false')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getArticles', (queryParams = '') => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/articles${queryParams}`,
        headers: {
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca categorias via API do CMS
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCategories', () => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/categories`,
        headers: {
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca coaches via API do CMS
 * @param {string} queryParams - Parâmetros de query string (ex: '?sort=title:asc')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getCoaches', (queryParams = '') => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/coaches${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca vídeos no sbt-video-uploader
 * @param {string} queryParams - Parâmetros de query string
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getVideos', (queryParams = '') => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/sbt-video-uploader/api-video-asset${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca lista de reels
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getReels', () => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/reels`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca playlists com vídeos
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getPlaylistsWithVideos', () => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/playlists-with-videos`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca singers com populate
 * @param {string} populate - Campos para popular (ex: 'Redes')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getSingers', (populate = '') => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');
    const queryParams = populate ? `?populate=${populate}` : '';

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/singers${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Busca hero-banners
 * @param {string} queryParams - Parâmetros de query string (ex: '?populate=*')
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHeroBanners', (queryParams = '') => {
    const CYPRESS_CMS_BASE_URL = getEnvVar('CYPRESS_CMS_BASE_URL');
    const CYPRESS_CMS_API_TOKEN = getEnvVar('CYPRESS_CMS_API_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_CMS_BASE_URL}/hero-banners${queryParams}`,
        headers: {
            'User-Agent': 'insomnia/11.3.0',
            'Authorization': `Bearer ${CYPRESS_CMS_API_TOKEN}`
        }
    });
});

/**
 * Health check da API de autenticação
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealth', () => {
    const CYPRESS_AUTH_BASE_URL = getEnvVar('CYPRESS_AUTH_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_AUTH_BASE_URL}/health`,
        headers: {}
    });
});

/**
 * Health check do banco de dados
 * @returns {Cypress.Chainable} - Response da requisição
 */
Cypress.Commands.add('getHealthDatabase', () => {
    const CYPRESS_AUTH_BASE_URL = getEnvVar('CYPRESS_AUTH_BASE_URL');

    return cy.request({
        method: 'GET',
        url: `${CYPRESS_AUTH_BASE_URL}/health/database`,
        headers: {}
    });
});

