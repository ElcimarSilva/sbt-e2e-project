// Selectors for the home page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  // Hero / destaque múltiplo
  imageMainContainer: 'section[aria-label="Seção de destaque múltiplo"]',
  firstImageMainContainer: 'section[aria-label="Seção de destaque múltiplo"]',
  bannerTitle: 'section[aria-label="Seção de destaque múltiplo"] h1',

  // Últimas notícias feed
  newsCard: 'section[aria-label="Últimas Notícias"] [role="feed"] article',
  // Use links da sessão "Mais lidas" para abrir uma notícia confiável
  allNews: 'section[aria-label="Mais lidas"] a',
  seeMoreItens: 'section[aria-label="Últimas Notícias"] [role="feed"] article',
  newsSession: "main, article",

  // Vídeos em alta
  videoSession: 'section[aria-label="Vídeos em alta"]',
  videoSessionPlaylist: 'section[aria-label="Vídeos em alta"]',

  // Cabeçalho/links globais
  headerSession: "header",
  liveButton: '[data-testid="live-button"]',

  // mobile selectors
  burgerHomeButton: '[aria-label="Menu"]',
  burgerMenuContainer:
    '[class="flex flex-col p-6 sm:landscape:pt-0 pb-20 gap-3"]',
};
