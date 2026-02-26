/**
 * home.js — Twenzetu Safari home page
 * Loads featured attractions and regions via api.js, renders them into the DOM.
 *
 * ES module: imported by index.html with <script type="module">.
 * Depends on: Splide, AOS, and lucide being loaded as globals before DOMContentLoaded fires.
 */
import { api } from './api.js';

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Returns a colored badge for the attraction difficulty level.
 * Difficulty classes (badge-easy, badge-moderate, badge-hard, badge-extreme)
 * are defined in css/styles.css.
 */
function difficultyBadge(level) {
  return `<span class="badge-${level} text-xs font-semibold px-2 py-0.5 rounded-full capitalize">${level}</span>`;
}

/**
 * Returns a styled badge for the attraction category display name.
 */
function categoryBadge(display) {
  return `<span class="badge-category text-xs font-semibold px-2 py-0.5 rounded-full">${display}</span>`;
}

// ── Featured Attractions (Splide) ─────────────────────────────────────

/**
 * Fetches featured attractions from the API, injects slide HTML into the
 * Splide list, then mounts the carousel. Lucide icons are re-created after
 * dynamic content is inserted.
 */
async function loadFeaturedAttractions() {
  const list = document.getElementById('featured-list');
  if (!list) return;

  try {
    const attractions = await api.getFeaturedAttractions();

    // Build each slide as a <li> — Splide requires this structure
    list.innerHTML = attractions.map(a => `
      <li class="splide__slide">
        <a href="attraction.html?slug=${a.slug}"
           class="attraction-card block rounded-2xl overflow-hidden relative h-96 group">

          <!-- Attraction image with a subtle zoom-on-hover effect -->
          <img src="${a.featured_image || 'images/photo-1547036967-23d11aacaee0.jpg'}"
               alt="${a.name}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               loading="lazy" />

          <!-- Dark gradient overlay so text is always readable -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <!-- Category badge — top-left corner -->
          <div class="absolute top-3 left-3 flex gap-2">
            ${categoryBadge(a.category_display)}
          </div>

          <!-- Card text content — sits at the bottom of the card -->
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 class="font-display text-xl font-bold mb-1">${a.name}</h3>
            <p class="text-sm text-white/80 mb-2">
              <i data-lucide="map-pin" class="inline w-3 h-3 mr-1"></i>${a.region_name}
            </p>
            <div class="flex items-center justify-between">
              ${difficultyBadge(a.difficulty_level)}
              <span class="text-xs text-white/70">Best: ${a.best_time_to_visit}</span>
            </div>
          </div>

        </a>
      </li>
    `).join('');

    // Mount Splide carousel now that slides exist in the DOM
    if (typeof Splide !== 'undefined') {
      new Splide('#featured-splide', {
        type:     'loop',   // infinite looping
        perPage:  3,        // show 3 slides on wide screens
        perMove:  1,
        gap:      '1.5rem',
        padding:  '2rem',
        breakpoints: {
          1024: { perPage: 2 }, // tablet: 2 slides
          768:  { perPage: 1 }, // mobile: 1 slide
        },
      }).mount();
    }

    // Lucide scans for [data-lucide] attributes — must be called after
    // dynamic HTML is inserted so new icons get rendered
    if (typeof lucide !== 'undefined') lucide.createIcons();

  } catch (err) {
    console.error('Failed to load featured attractions:', err);
    list.innerHTML = '<li class="splide__slide"><p class="text-red-500 p-4">Failed to load attractions.</p></li>';
  }
}

// ── Regions Grid ──────────────────────────────────────────────────────

/**
 * Fetches all regions from the API and renders them into a 3-column grid.
 * Each card links to regions.html anchored to that region's section.
 * AOS is refreshed so newly inserted elements animate on scroll.
 */
async function loadRegions() {
  const grid = document.getElementById('regions-grid');
  if (!grid) return;

  try {
    const regions = await api.getRegions();

    grid.innerHTML = regions.map(r => `
      <div data-aos="fade-up" class="group">
        <a href="regions.html#region-${r.slug}"
           class="block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

          <!-- Region image with aspect-video (16/9) crop -->
          <div class="relative aspect-video overflow-hidden">
            <img src="${r.image || ''}" alt="${r.name}"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <!-- Region name sits over the image -->
            <span class="absolute bottom-3 left-3 text-white font-display text-xl font-bold">${r.name}</span>
          </div>

          <!-- Card body below the image -->
          <div class="p-4 bg-white">
            <!-- Two-line truncated description via Tailwind's line-clamp -->
            <p class="text-tz-muted text-sm line-clamp-2">${r.description}</p>
            <p class="mt-2 text-tz-forest font-semibold text-sm">
              <i data-lucide="map-pin" class="inline w-4 h-4 mr-1"></i>
              ${r.attraction_count} attraction${r.attraction_count !== 1 ? 's' : ''}
            </p>
          </div>

        </a>
      </div>
    `).join('');

    // Re-render icons in newly inserted HTML
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Tell AOS to recalculate positions for the new elements
    if (typeof AOS !== 'undefined') AOS.refresh();

  } catch (err) {
    console.error('Failed to load regions:', err);
    grid.innerHTML = '<p class="text-red-500">Failed to load regions.</p>';
  }
}

// ── Init ──────────────────────────────────────────────────────────────

/**
 * Kick off both data-loading functions once the DOM is ready.
 * They run concurrently — no need to await one before starting the other.
 */
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedAttractions();
  loadRegions();
});
