// Selectors for the home page
// Keep selectors centralized so Page Objects can reuse them

module.exports = {
  teamsBanner: '[aria-label="Times"]',
  filterSession: '[class="flex gap-3 min-w-max"]',
  imageSession: '[class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 landscape:lg:grid-cols-4 gap-4 sm:gap-12 md:gap-8"]',
  whiteButtonFiltered: '.border-white',
  teamsButtonFilter: '[class="hidden sm:block"] [type="button"]'
};
