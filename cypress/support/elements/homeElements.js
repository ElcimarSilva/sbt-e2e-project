// Selectors for the home page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  imageMainContainer: '[class="absolute inset-0"] > img',
  firstImageMainContainer: '[class="absolute inset-0"] > img',
  newsCard: '[class="border-b border-white/10 pb-6 last:border-0 last:pb-0"]',
  bannerTitle: '[class="w-full flex flex-col space-y-3 mb-8"] h2',
  allNews: '[class="group/notice w-full transition-transform duration-200 ease-out hover:-translate-y-0.5"]',
  seeMoreItens: '.rounded-sm.gap-4 div article',
  newsSession: '[class="flex flex-col gap-3"]',
  videoSessionPlaylist: '[aria-label="Video player"]',
  videoSession: '[class="flex flex-col gap-4"]',
  reelsGrid: '[class="reels-grid"]',
  rellsCarrouselNavButtonLeft: '[aria-label="Scroll left"]',
  rellsCarrouselNavButtonRight: '[aria-label="Scroll right"]',
  headerSession: 'header',
  liveButton: '[class="hidden md:flex px-4 py-2 rounded-full bg-white/10 text-gray-50 text-md items-center gap-2 hover:bg-white/15 transition-colors"]',
  // mobile selectors
  burgerHomeButton: '[aria-label="Menu"]',
  burgerMenuContainer: '[class="flex flex-col p-6 sm:landscape:pt-0 pb-20 gap-3"]'
};
