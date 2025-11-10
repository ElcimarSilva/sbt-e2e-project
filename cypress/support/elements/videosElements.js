// Selectors for the videos page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  relatedVideosItens: '.flex.flex-col.snap-start',
  mainSessionVideos: '[aria-label="Vídeos"]',
  carrouselNextButton: 'button[aria-label="Próximo"]',
  carrouselPreviousButton: 'button[aria-label="Anterior"]',
  classActiveCarrouselButton: 'w-2 h-2 rounded-full border border-gray-400 bg-white',
  classInactiveCarrouselButton: 'w-2 h-2 rounded-full border border-gray-400 bg-white/50',
  secondItemOnCarrousel: '[aria-label="Ir para vídeo 2"]',
  firstItemOnCarrousel: '[aria-label="Ir para vídeo 1"]',
};
