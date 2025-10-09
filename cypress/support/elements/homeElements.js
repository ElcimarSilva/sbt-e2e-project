// Selectors for the home page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  imageMainContainer: '[class="w-full flex-1 order-1 mobile-landscape:order-2 md:order-2 relative"]',
  newsCard: '[class="border-b border-white/10 pb-6 last:border-0 last:pb-0"]',
  bannerTitle: '[class="w-full flex items-center text-white text-lg mobile-landscape:max-h-30 mobile-landscape:min-h-30 h-30 min-h-30 md:text-2xl font-semibold leading-tight overflow-hidden max-h-64"]',
  bannerNext: '.banner [aria-label="Próximo"]',
  firstNewsImageAlt: '[alt="Técnicos do The Voice Brasil no SBT: carisma é suficiente?"]',
  seeMoreContainer: '[class="flex rounded-sm border border-gray-800 flex-col bg-[#111] gap-4 p-4"]',
  seeMoreItens: '.rounded-sm.gap-4 div article',
};
