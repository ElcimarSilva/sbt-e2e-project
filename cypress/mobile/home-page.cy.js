const homePage = require('../support/pages/homePage');

describe('Tests on home page TheVoice on mobile ', () => {

    beforeEach(() => {
        homePage.visit();
    });

    it('deve verificar o menu de harmburger', () => {
        homePage.getBurgerHomeButton().should('be.visible').click();
        homePage.getBurgerMenuContainer().should('be.visible');
        homePage.getBurgerMenuContainer().find('a').should('have.attr', 'href').and('contain', '/');
        homePage.getBurgerMenuContainer().find('a').eq('1').should('have.attr', 'href').and('contain', '/novidades');
        homePage.getBurgerMenuContainer().find('a').eq('2').should('have.attr', 'href').and('contain', '/tecnicos');
        homePage.getBurgerMenuContainer().find('a').eq('3').should('have.attr', 'href').and('contain', '/times');
        homePage.getBurgerMenuContainer().find('a').eq('4').should('have.attr', 'href').and('contain', '/videos');
        homePage.getBurgerMenuContainer().contains('Ao vivo').should('be.visible');
        homePage.getBurgerMenuContainer().matchImageSnapshot('burger-menu-mobile');

    });

    it('deve verificar o dimensionamento correto do conteudo', () => {
    });

});