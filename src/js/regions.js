/**
 * regions.js — Regions listing page
 *
 * Fetches regions and all attractions from api.js.
 * For each region, renders a full detail section with:
 *   - Large hero image + description panel (alternating left/right)
 *   - Attraction count badge, GPS coordinates
 *   - "View Attractions" button pre-filtered to that region
 *   - A 3-card attractions preview grid
 *
 * Also handles ?highlight=<slug> URL param: after rendering,
 * smoothly scrolls to the matching region section.
 */

import { api } from './api.js';

// ── Badge helpers ─────────────────────────────────────────────────────

/**
 * Returns a colored difficulty badge <span>.
 * Reuses the same badge-* CSS classes defined in styles.css.
 *
 * @param {string} level - e.g. "easy", "moderate", "extreme"
 */
function difficultyBadge(level) {
  return `<span class="badge-${level} text-xs font-semibold px-2 py-0.5 rounded-full capitalize">${level}</span>`;
}

// ── Data helpers ──────────────────────────────────────────────────────

/**
 * Filters attractions by region name and returns the first 3.
 * We show only a preview — the full list is on attractions.html.
 *
 * @param {Array}  attractions - Full attractions array from the API.
 * @param {string} regionName  - Region name to match (e.g. "Kilimanjaro").
 * @returns {Array} Up to 3 attractions belonging to that region.
 */
function getAttractionsByRegion(attractions, regionName) {
  return attractions
    .filter(a => a.region_name === regionName)
    .slice(0, 3);
}

// ── Card builder ──────────────────────────────────────────────────────

/**
 * Builds a compact mini-card HTML string for one attraction.
 * Used inside the attractions preview grid within each region section.
 *
 * @param {Object} attraction - Attraction object from the API / mock data.
 * @returns {string} HTML string for one card.
 */
function buildAttractionCard(attraction) {
  const fallbackImg = 'images/photo-1547036967-23d11aacaee0.jpg';
  const imgSrc      = attraction.featured_image || fallbackImg;

  return `
    <article class="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">

      <!-- Attraction thumbnail -->
      <div class="relative aspect-video overflow-hidden">
        <img src="${imgSrc}"
             alt="${attraction.name}"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             loading="lazy" />
        <!-- Difficulty badge overlays the image bottom-left -->
        <div class="absolute bottom-2 left-2">
          ${difficultyBadge(attraction.difficulty_level)}
        </div>
      </div>

      <!-- Card body: name + link -->
      <div class="p-4 flex items-center justify-between gap-2">
        <h4 class="font-display text-sm font-bold text-tz-dark leading-snug">
          ${attraction.name}
        </h4>
        <a href="attraction.html?slug=${attraction.slug}"
           class="shrink-0 text-tz-forest hover:text-tz-forest/70 transition-colors"
           aria-label="View details for ${attraction.name}">
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      </div>

    </article>
  `;
}

// ── Region section builder ─────────────────────────────────────────────

/**
 * Builds the full HTML section for one region.
 *
 * Layout alternates image position for visual rhythm:
 *   even index (0, 2, …) → image LEFT,  description RIGHT
 *   odd  index (1, 3, …) → image RIGHT, description LEFT
 *
 * Each section is anchored with id="region-<slug>" so the
 * ?highlight param can scroll directly to it.
 *
 * @param {Object} region      - Region object from the API.
 * @param {Array}  attractions - Up to 3 attractions for this region.
 * @param {number} index       - Zero-based position in the regions array
 *                               (used to alternate image side).
 * @returns {string} HTML string for one complete region section.
 */
function buildRegionSection(region, attractions, index) {
  const fallbackImg = 'images/photo-1547036967-23d11aacaee0.jpg';
  const imgSrc      = region.image || fallbackImg;

  // Alternate: even → image left; odd → image right
  const imageLeft = index % 2 === 0;

  // Parse coordinates to fixed 4 decimal places for display
  const lat = parseFloat(region.latitude).toFixed(4);
  const lng = parseFloat(region.longitude).toFixed(4);

  // Build the attractions preview grid (up to 3 cards)
  const attractionCards = attractions.length > 0
    ? attractions.map(buildAttractionCard).join('')
    : `<p class="col-span-full text-tz-muted text-sm italic">No attractions listed yet.</p>`;

  return `
    <!-- ── Region: ${region.name} ──────────────────────────────── -->
    <section id="region-${region.slug}"
             class="scroll-mt-20"
             data-aos="fade-up"
             aria-labelledby="region-title-${region.slug}">

      <!-- Top row: hero image + description panel -->
      <div class="flex flex-col ${imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-stretch mb-10">

        <!-- Region hero image — 1/3 width on desktop -->
        <div class="lg:w-1/3 shrink-0 rounded-2xl overflow-hidden shadow-md">
          <img src="${imgSrc}"
               alt="Landscape of ${region.name} region"
               class="w-full h-full object-cover min-h-64 lg:min-h-0"
               loading="lazy" />
        </div>

        <!-- Description panel — 2/3 width on desktop -->
        <div class="flex flex-col justify-center flex-1">

          <!-- Region name -->
          <h2 id="region-title-${region.slug}"
              class="font-display text-4xl sm:text-5xl font-bold text-tz-dark mb-4 leading-tight">
            ${region.name}
          </h2>

          <!-- Description paragraph -->
          <p class="text-tz-muted text-base sm:text-lg leading-relaxed mb-6">
            ${region.description}
          </p>

          <!-- Meta row: attraction count + GPS coordinates -->
          <div class="flex flex-wrap items-center gap-4 mb-8">

            <!-- Attraction count badge -->
            <span class="inline-flex items-center gap-1.5 bg-tz-forest/10 text-tz-forest
                         text-sm font-semibold px-3 py-1.5 rounded-full">
              <i data-lucide="map-pin" class="w-4 h-4" aria-hidden="true"></i>
              ${region.attraction_count} Attraction${region.attraction_count !== 1 ? 's' : ''}
            </span>

            <!-- GPS coordinates -->
            <span class="inline-flex items-center gap-1.5 bg-tz-sand text-tz-earth
                         text-sm font-mono px-3 py-1.5 rounded-full"
                  title="GPS coordinates for ${region.name}">
              <i data-lucide="navigation" class="w-4 h-4" aria-hidden="true"></i>
              ${lat}, ${lng}
            </span>

          </div>

          <!-- "View Attractions" CTA — links to attractions.html pre-filtered -->
          <div>
            <a href="attractions.html?region=${encodeURIComponent(region.name)}"
               class="inline-flex items-center gap-2 bg-tz-forest text-white font-semibold
                      px-6 py-3 rounded-full hover:bg-tz-forest/90 transition-colors shadow-sm">
              View Attractions
              <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Attractions preview grid: up to 3 cards -->
      <div>
        <h3 class="font-display text-xl font-semibold text-tz-dark mb-5 flex items-center gap-2">
          <i data-lucide="layout-grid" class="w-5 h-5 text-tz-savanna" aria-hidden="true"></i>
          Top Attractions in ${region.name}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
             aria-label="Attractions preview for ${region.name}">
          ${attractionCards}
        </div>
      </div>

      <!-- Subtle divider (hidden on last item via CSS sibling, handled by spacing) -->
      <div class="mt-16 border-b border-gray-100" aria-hidden="true"></div>

    </section>
  `;
}

// ── Init ──────────────────────────────────────────────────────────────

/**
 * Main entry point.
 *
 * 1. Fetches regions and attractions concurrently (Promise.all avoids
 *    sequential waterfall — both requests fire at the same time).
 * 2. Builds and injects a section for each region.
 * 3. Re-initialises Lucide icons and AOS so the newly injected elements
 *    get their SVG icons and scroll-animation triggers.
 * 4. If ?highlight=<slug> is in the URL, smoothly scrolls to that region.
 */
async function init() {
  const container = document.getElementById('regions-container');
  if (!container) return;

  try {
    // Fetch both datasets in parallel — no need to wait for one before the other
    const [regions, attractions] = await Promise.all([
      api.getRegions(),
      api.getAttractions(),
    ]);

    // Build HTML for every region and inject it all at once
    // (single innerHTML write avoids multiple reflows)
    container.innerHTML = regions.map((region, index) => {
      const preview = getAttractionsByRegion(attractions, region.name);
      return buildRegionSection(region, preview, index);
    }).join('');

    // Re-create Lucide SVG icons for all data-lucide attributes injected above
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Refresh AOS so newly added sections register their scroll triggers
    if (typeof AOS !== 'undefined') AOS.refresh();

    // ── ?highlight=<slug> — scroll to a specific region ────────────
    // Useful when linking here from another page with a region anchor,
    // e.g. regions.html?highlight=zanzibar
    const params    = new URLSearchParams(window.location.search);
    const highlight = params.get('highlight');
    if (highlight) {
      const target = document.getElementById(`region-${highlight}`);
      if (target) {
        // Small delay gives the browser time to layout the injected DOM
        // before attempting to scroll to it
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }

  } catch (err) {
    console.error('[regions] Failed to load regions:', err);
    container.innerHTML = `
      <p class="text-center text-red-500 py-16">
        Failed to load regions. Please try refreshing the page.
      </p>
    `;
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────

/**
 * Wait for the DOM to be ready before querying elements.
 * scripts.js (loaded with defer) handles AOS.init() and lucide.createIcons()
 * for static elements; we call them again here for dynamically inserted HTML.
 */
document.addEventListener('DOMContentLoaded', () => {
  init();
});
