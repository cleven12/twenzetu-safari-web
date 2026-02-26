/**
 * attractions.js — Attractions listing page
 *
 * Fetches all attractions, renders cards, handles filtering by:
 * - region      (data-filter="region")
 * - category    (data-filter="category")
 * - difficulty  (data-filter="difficulty")
 * - search text (debounced text input)
 *
 * Also handles grid ↔ list view toggle.
 *
 * ES module: imported by attractions.html with <script type="module">.
 * Depends on: AOS and lucide being available as globals (loaded via CDN).
 */

import { api } from './api.js';

// ── State ─────────────────────────────────────────────────────────────

/** Full dataset fetched once on init; never mutated after that. */
let allAttractions = [];

/**
 * Active filter values.
 * 'all' means no filter is applied for that dimension.
 */
let filters = {
  region:     'all',
  category:   'all',
  difficulty: 'all',
  search:     '',
};

/** Current view mode: 'grid' or 'list' */
let viewMode = 'grid';

// ── Badge helpers (mirrors home.js) ──────────────────────────────────

/**
 * Returns a colored <span> badge for the attraction difficulty level.
 * CSS classes (badge-easy, badge-moderate, etc.) are in styles.css.
 */
function difficultyBadge(level) {
  return `<span class="badge-${level} text-xs font-semibold px-2 py-0.5 rounded-full capitalize">${level}</span>`;
}

/**
 * Returns a styled <span> badge for the attraction category display name.
 */
function categoryBadge(display) {
  return `<span class="badge-category text-xs font-semibold px-2 py-0.5 rounded-full">${display}</span>`;
}

// ── Rendering ─────────────────────────────────────────────────────────

/**
 * Generates the HTML for a single attraction card.
 *
 * Grid mode: stacked card with image on top, content below.
 * List mode: horizontal card with image on the left, content on the right.
 *
 * @param {Object} a  - Attraction object from the API / mock data.
 * @returns {string}  - HTML string for one card.
 */
function buildCard(a) {
  const fallbackImg = 'images/photo-1547036967-23d11aacaee0.jpg';
  const imgSrc      = a.featured_image || fallbackImg;

  if (viewMode === 'list') {
    // ── List view: landscape card ──────────────────────────────────
    return `
      <article class="attraction-card rounded-2xl overflow-hidden shadow-sm bg-white
                      flex flex-col sm:flex-row group"
               data-aos="fade-up">

        <!-- Thumbnail — fixed width in list view -->
        <div class="relative sm:w-56 shrink-0 overflow-hidden aspect-video sm:aspect-auto">
          <img src="${imgSrc}"
               alt="${a.name}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               loading="lazy" />
          <!-- Category badge overlays the image -->
          <div class="absolute top-2 left-2">
            ${categoryBadge(a.category_display)}
          </div>
        </div>

        <!-- Card body -->
        <div class="flex flex-col justify-between p-5 flex-1">
          <div>
            <h3 class="font-display text-xl font-bold text-tz-dark mb-1">${a.name}</h3>

            <!-- Region with map-pin icon -->
            <p class="text-tz-muted text-sm mb-3 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 shrink-0"></i>
              ${a.region_name}
            </p>

            <p class="text-tz-muted text-sm line-clamp-3 mb-4">${a.short_description}</p>
          </div>

          <!-- Footer row: badges + link -->
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              ${difficultyBadge(a.difficulty_level)}
              <span class="text-xs text-tz-muted flex items-center gap-1">
                <i data-lucide="calendar" class="w-3 h-3"></i>
                ${a.best_time_to_visit}
              </span>
            </div>
            <a href="attraction.html?slug=${a.slug}"
               class="text-sm font-semibold text-tz-forest hover:text-tz-forest/80
                      flex items-center gap-1 transition-colors">
              View Details
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>

      </article>
    `;
  }

  // ── Grid view: vertical card (default) ────────────────────────────
  return `
    <article class="attraction-card rounded-2xl overflow-hidden shadow-sm bg-white group"
             data-aos="fade-up">

      <!-- Image with 16/9 aspect ratio -->
      <div class="relative aspect-video overflow-hidden">
        <img src="${imgSrc}"
             alt="${a.name}"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             loading="lazy" />

        <!-- Category badge — top-left corner overlaying the image -->
        <div class="absolute top-3 left-3">
          ${categoryBadge(a.category_display)}
        </div>
      </div>

      <!-- Card body -->
      <div class="p-5">
        <!-- Attraction name -->
        <h3 class="font-display text-xl font-bold text-tz-dark mb-1">${a.name}</h3>

        <!-- Region with map-pin icon -->
        <p class="text-tz-muted text-sm mb-3 flex items-center gap-1">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 shrink-0"></i>
          ${a.region_name}
        </p>

        <!-- Short description, clamped to 3 lines to keep cards uniform -->
        <p class="text-tz-muted text-sm line-clamp-3 mb-4">${a.short_description}</p>

        <!-- Footer row: difficulty badge, best time, link -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            ${difficultyBadge(a.difficulty_level)}
            <span class="text-xs text-tz-muted flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i>
              ${a.best_time_to_visit}
            </span>
          </div>
          <a href="attraction.html?slug=${a.slug}"
             class="text-sm font-semibold text-tz-forest hover:text-tz-forest/80
                    flex items-center gap-1 transition-colors">
            View Details
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>

    </article>
  `;
}

/**
 * Renders `attractions` into #attractions-grid, updates the result count,
 * and shows/hides the empty state.
 *
 * Called by applyFilters() every time a filter changes.
 *
 * @param {Array} attractions - Filtered subset of allAttractions to display.
 */
function renderCards(attractions) {
  const grid       = document.getElementById('attractions-grid');
  const emptyState = document.getElementById('empty-state');
  const countEl    = document.getElementById('results-count');

  if (!grid) return;

  // Update count label
  if (countEl) countEl.textContent = attractions.length;

  if (attractions.length === 0) {
    // Show empty state, hide grid
    grid.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }

  // Hide empty state, populate grid
  emptyState?.classList.add('hidden');
  grid.innerHTML = attractions.map(buildCard).join('');

  // Re-render Lucide icons — buildCard injects data-lucide attributes
  // that only become real SVGs after lucide.createIcons() is called.
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Refresh AOS so newly injected elements animate when they scroll into view
  if (typeof AOS !== 'undefined') AOS.refresh();
}

// ── Filtering ─────────────────────────────────────────────────────────

/**
 * Applies the current `filters` state to `allAttractions` and re-renders.
 *
 * Filter logic:
 * - Region, category, difficulty: exact match against the attraction field
 *   (or skip if the filter value is 'all').
 * - Search: case-insensitive substring match on the attraction name.
 */
function applyFilters() {
  const { region, category, difficulty, search } = filters;
  const query = search.trim().toLowerCase();

  const results = allAttractions.filter(a => {
    // Region filter — compare against region_name
    if (region !== 'all' && a.region_name !== region) return false;

    // Category filter — compare against category (slug form, e.g. "wildlife")
    if (category !== 'all' && a.category !== category) return false;

    // Difficulty filter — compare against difficulty_level (e.g. "easy")
    if (difficulty !== 'all' && a.difficulty_level !== difficulty) return false;

    // Search filter — match name (case-insensitive)
    if (query && !a.name.toLowerCase().includes(query)) return false;

    return true;
  });

  renderCards(results);
}

// ── Filter pill click handler ─────────────────────────────────────────

/**
 * Sets up click handlers on all .filter-pill buttons.
 *
 * Key behaviour: clicking "Arusha" (region) deactivates other *region* pills
 * only — it must not touch difficulty or category pills. We achieve this by
 * scoping the active-class toggle to pills sharing the same data-filter value.
 */
function initFilterPills() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const filterKey   = pill.dataset.filter;  // e.g. "region"
      const filterValue = pill.dataset.value;   // e.g. "Arusha"

      // ── Deactivate all pills in the *same* filter group only ──
      // querySelectorAll scopes to the current document; we match by
      // data-filter so we never touch pills from a different group.
      document.querySelectorAll(`.filter-pill[data-filter="${filterKey}"]`)
              .forEach(p => p.classList.remove('active'));

      // ── Activate the clicked pill ──
      pill.classList.add('active');

      // ── Update the filters state object ──
      filters[filterKey] = filterValue;

      // ── Re-run the filter and re-render ──
      applyFilters();
    });
  });
}

// ── Search input (debounced) ──────────────────────────────────────────

/**
 * Returns a debounced version of `fn` that waits `delay` ms after the
 * last call before executing. This avoids filtering on every keystroke.
 *
 * @param {Function} fn    - Function to debounce.
 * @param {number}   delay - Milliseconds to wait (300ms feels snappy).
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Wires up the search box with a 300 ms debounce. */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const handleSearch = debounce(e => {
    filters.search = e.target.value;
    applyFilters();
  }, 300);

  input.addEventListener('input', handleSearch);
}

// ── Grid / List view toggle ───────────────────────────────────────────

/**
 * Switches #attractions-grid between a 3-column grid and a single-column
 * list layout by toggling Tailwind classes and the viewMode state variable.
 * Re-renders cards so buildCard() uses the correct template.
 */
function initViewToggle() {
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const grid    = document.getElementById('attractions-grid');

  const setGrid = () => {
    viewMode = 'grid';
    grid?.classList.replace('grid-cols-1', 'grid-cols-1');  // reset to responsive
    grid?.classList.remove('sm:grid-cols-1', 'lg:grid-cols-1');
    grid?.classList.add('sm:grid-cols-2', 'lg:grid-cols-3');
    gridBtn?.classList.add('bg-white', 'shadow-sm', 'text-tz-forest');
    gridBtn?.classList.remove('text-tz-muted');
    listBtn?.classList.remove('bg-white', 'shadow-sm', 'text-tz-forest');
    listBtn?.classList.add('text-tz-muted');
    gridBtn?.setAttribute('aria-pressed', 'true');
    listBtn?.setAttribute('aria-pressed', 'false');
    applyFilters(); // re-render with grid card template
  };

  const setList = () => {
    viewMode = 'list';
    grid?.classList.remove('sm:grid-cols-2', 'lg:grid-cols-3');
    grid?.classList.add('sm:grid-cols-1', 'lg:grid-cols-1');
    listBtn?.classList.add('bg-white', 'shadow-sm', 'text-tz-forest');
    listBtn?.classList.remove('text-tz-muted');
    gridBtn?.classList.remove('bg-white', 'shadow-sm', 'text-tz-forest');
    gridBtn?.classList.add('text-tz-muted');
    gridBtn?.setAttribute('aria-pressed', 'false');
    listBtn?.setAttribute('aria-pressed', 'true');
    applyFilters(); // re-render with list card template
  };

  gridBtn?.addEventListener('click', setGrid);
  listBtn?.addEventListener('click', setList);
}

// ── Reset button ──────────────────────────────────────────────────────

/**
 * Wires the "Reset all filters" button in the empty state.
 * Resets the filters object, re-activates the "All" pills, clears search.
 */
function initResetButton() {
  document.getElementById('reset-filters')?.addEventListener('click', () => {
    // Reset state
    filters = { region: 'all', category: 'all', difficulty: 'all', search: '' };

    // Clear search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    // Re-activate all "All" pills and deactivate the rest
    ['region', 'category', 'difficulty'].forEach(key => {
      document.querySelectorAll(`.filter-pill[data-filter="${key}"]`).forEach(p => {
        // Activate only the pill with data-value="all"
        p.classList.toggle('active', p.dataset.value === 'all');
      });
    });

    applyFilters();
  });
}

// ── Init ──────────────────────────────────────────────────────────────

/**
 * Fetches all attractions from the API (or mock data), stores them in
 * `allAttractions`, then renders the full unfiltered list.
 *
 * All interaction handlers are set up here too, after DOM is ready.
 */
async function init() {
  // Pre-apply filters from URL query params (e.g. ?region=Zanzibar from regions.html links)
  const params = new URLSearchParams(window.location.search);
  if (params.get('region')) filters.region = params.get('region').toLowerCase();
  if (params.get('category')) filters.category = params.get('category').toLowerCase();
  if (params.get('difficulty')) filters.difficulty = params.get('difficulty').toLowerCase();

  try {
    allAttractions = await api.getAttractions();
    renderCards(allAttractions);
  } catch (err) {
    console.error('[attractions] Failed to load attractions:', err);
    const grid = document.getElementById('attractions-grid');
    if (grid) {
      grid.innerHTML = `
        <p class="col-span-full text-center text-red-500 py-12">
          Failed to load attractions. Please try refreshing the page.
        </p>
      `;
    }
  }

  // Wire up all interactive controls after data is loaded
  initFilterPills();
  initSearch();
  initViewToggle();
  initResetButton();
}

// ── Bootstrap ─────────────────────────────────────────────────────────

/**
 * Wait for the DOM before touching any elements.
 * scripts.js (loaded with defer) handles AOS.init() and lucide.createIcons()
 * for static elements; we call them again after dynamic content is inserted.
 */
document.addEventListener('DOMContentLoaded', () => {
  init();
});
