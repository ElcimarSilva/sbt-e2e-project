// Selectors for the videos page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  // Usar elementos mais estáveis do DOM (data-testid / tags sem classes dinâmicas)
  relatedVideosItens:
    'div[data-testid^="mobile-"], div[data-testid^="desktop-"]',
  // O <main> contém o título <h1> "Vídeos" — usar main para encontrar a seção principal
  mainSessionVideos: "main",
  // Controles do carrossel: manter como opção, mas testes devem validar existência antes de interagir
  carrouselNextButton: 'button[aria-label="Próximo"]',
  carrouselPreviousButton: 'button[aria-label="Anterior"]',
  classActiveCarrouselButton:
    "w-2 h-2 rounded-full border border-gray-400 bg-white",
  classInactiveCarrouselButton:
    "w-2 h-2 rounded-full border border-gray-400 bg-white/50",
  secondItemOnCarrousel: '[aria-label="Ir para vídeo 2"]',
  firstItemOnCarrousel: '[aria-label="Ir para vídeo 1"]',
};
