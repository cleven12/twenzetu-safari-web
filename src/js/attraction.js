/**
 * attraction.js — Attraction detail page
 *
 * Reads ?slug= from the URL, fetches attraction detail + weather from api.js,
 * and populates the page DOM.
 *
 * Flow:
 *   DOMContentLoaded → init()
 *     ├─ getSlug()          — parse ?slug= from URL
 *     ├─ api.getAttraction(slug) + api.getWeather(slug)  [concurrent]
 *     ├─ populateDetail(attraction)
 *     ├─ initGallery(attraction.images)
 *     ├─ populateWeather(weather)
 *     ├─ loadSimilar(slug, regionName)
 *     └─ initShare(attraction)
 */

import { api } from './api.js';

// ── Helpers ───────────────────────────────────────────────────────────

/**
 * Sets textContent of an element by id, silently if not found.
 * @param {string} id
 * @param {string} text
 */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text ?? '—';
}

/**
 * Sets innerHTML of an element by id, silently if not found.
 * @param {string} id
 * @param {string} html
 */
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/**
 * Returns a Yes/No badge span.
 * Green for yes, red for no — provides quick visual scanning in the table.
 * @param {boolean} value
 * @returns {string} HTML string
 */
function yesNoBadge(value) {
  return value
    ? `<span class="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
         <i data-lucide="check" class="w-3 h-3"></i> Yes
       </span>`
    : `<span class="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">
         <i data-lucide="x" class="w-3 h-3"></i> No
       </span>`;
}

/**
 * Returns a colored difficulty badge span.
 * Mirrors the badge CSS classes defined in styles.css.
 * @param {string} level  e.g. "easy", "moderate", "extreme"
 * @param {string} display  e.g. "Easy"
 * @returns {string} HTML string
 */
function difficultyBadge(level, display) {
  return `<span class="badge-${level} text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
    ${display || level}
  </span>`;
}

/**
 * Returns a category badge span (blue pill).
 * @param {string} display  e.g. "Wildlife Safari"
 * @returns {string} HTML string
 */
function categoryBadge(display) {
  return `<span class="badge-category text-xs font-semibold px-2.5 py-1 rounded-full">${display}</span>`;
}

// ── 1. getSlug ────────────────────────────────────────────────────────

/**
 * Reads the `slug` query parameter from the current page URL.
 * e.g. attraction.html?slug=serengeti-national-park → "serengeti-national-park"
 * @returns {string|null}
 */
function getSlug() {
  return new URLSearchParams(window.location.search).get('slug');
}

// ── 2. initGallery ────────────────────────────────────────────────────

/**
 * Injects <li class="splide__slide"> items into #gallery-list, then
 * mounts Splide in loop/cover mode so images fill the full viewport.
 *
 * Each slide renders the image as an <img> with object-cover + min-h-screen
 * so it behaves like a full-bleed background.
 *
 * @param {Array<{image: string, caption: string}>} images
 */
function initGallery(images) {
  const list = document.getElementById('gallery-list');
  if (!list || !images?.length) return;

  // Build one <li> per image
  list.innerHTML = images.map(img => `
    <li class="splide__slide relative min-h-screen">
      <img src="${img.image}"
           alt="${img.caption || ''}"
           class="absolute inset-0 w-full h-full object-cover object-center"
           loading="eager" />
    </li>
  `).join('');

  // Mount Splide. heightRatio is relative to the track width; cover:true
  // makes Splide treat each slide image as an object-cover background.
  // type:'loop' enables infinite cycling.
  if (typeof Splide !== 'undefined') {
    new Splide('#gallery-splide', {
      type:        'loop',
      heightRatio: 0.6,   // 60% of track width — overridden by min-h-screen CSS
      cover:       true,
      lazyLoad:    false, // first slide must be eager
      pagination:  true,
      arrows:      true,
      autoplay:    true,
      interval:    5000,
      pauseOnHover: true,
    }).mount();
  }
}

// ── 3. populateDetail ─────────────────────────────────────────────────

/**
 * Populates every id="…" element on the page with data from the
 * attraction detail object returned by the API.
 *
 * @param {Object} a  Attraction detail object (see mockdata.js for shape)
 */
function populateDetail(a) {
  // ── Hero overlay ─────────────────────────────────────────────────

  // Category badge above the H1
  setHTML('attraction-category-badge', categoryBadge(a.category_display));

  // H1 title
  setText('attraction-name', a.name);

  // Region — update the text node inside the <p> while keeping the icon
  const regionEl = document.getElementById('attraction-region');
  if (regionEl) {
    const regionName = a.region?.name ?? a.region_name ?? '—';
    // The span inside the <p> holds the text
    const span = regionEl.querySelector('span');
    if (span) span.textContent = regionName;
  }

  // Breadcrumb last item
  setText('breadcrumb-name', a.name);

  // Difficulty badge in the hero
  setHTML('attraction-difficulty', difficultyBadge(a.difficulty_level, a.difficulty_display));

  // ── Overview / Description ────────────────────────────────────────

  // Split on newline characters to create separate paragraphs.
  // The API may send a single long string or a multi-paragraph string.
  const descEl = document.getElementById('attraction-description');
  if (descEl && a.description) {
    descEl.innerHTML = a.description
      .split('\n')
      .filter(p => p.trim()) // skip blank lines
      .map(p => `<p class="text-tz-muted leading-relaxed">${p.trim()}</p>`)
      .join('');
  }

  // ── Key Info Table ────────────────────────────────────────────────

  setText('info-altitude',  a.altitude != null ? `${a.altitude.toLocaleString()} m` : '—');
  setHTML('info-difficulty', difficultyBadge(a.difficulty_level, a.difficulty_display));
  setText('info-duration',  a.estimated_duration ?? '—');
  setText('info-fee',       a.entrance_fee ? `$${a.entrance_fee} USD per person` : 'Free');
  setHTML('info-guide',     yesNoBadge(a.requires_guide));
  setHTML('info-permit',    yesNoBadge(a.requires_permit));
  setText('info-airport',   a.nearest_airport ?? '—');
  setText('info-distance',  a.distance_from_airport ?? '—');

  // ── Access Info ───────────────────────────────────────────────────
  setText('attraction-access', a.access_info ?? '—');

  // ── Seasonal Availability ─────────────────────────────────────────
  setText('attraction-seasonal', a.seasonal_availability ?? '—');

  // ── Traveller Tips ────────────────────────────────────────────────
  const tipsList = document.getElementById('tips-list');
  if (tipsList) {
    if (a.tips?.length) {
      // Sort tips by their `order` field before rendering
      const sorted = [...a.tips].sort((x, y) => (x.order ?? 0) - (y.order ?? 0));
      tipsList.innerHTML = sorted.map((t, i) => `
        <li class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                   flex gap-4 items-start"
            data-aos="fade-up">
          <!-- Numbered circle indicator -->
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-tz-forest/10 text-tz-forest
                       text-sm font-bold flex items-center justify-center font-mono"
                aria-hidden="true">
            ${i + 1}
          </span>
          <div class="min-w-0">
            <!-- tip.title if present, otherwise derive a short heading -->
            ${t.title
              ? `<h4 class="font-semibold text-tz-dark mb-1">${t.title}</h4>`
              : ''}
            <!-- tip.tip holds the main tip text -->
            <p class="text-tz-muted text-sm leading-relaxed">${t.tip ?? t.description ?? '—'}</p>
            ${t.author
              ? `<p class="text-xs text-tz-muted mt-2 italic">— ${t.author}</p>`
              : ''}
          </div>
        </li>
      `).join('');
    } else {
      tipsList.innerHTML = `<li class="text-tz-muted text-sm">No tips available yet.</li>`;
    }
  }

  // ── GPS Coordinates + OpenStreetMap iframe ─────────────────────────
  if (a.latitude && a.longitude) {
    const lat = parseFloat(a.latitude);
    const lng = parseFloat(a.longitude);
    setText('info-coords', `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`);

    // Build OSM embed URL with a marker pin
    const delta = 0.05; // ~5 km bounding box half-side
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
    const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
    const osmFull  = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=13/${lat}/${lng}`;

    const mapFrame = document.getElementById('osm-map');
    const mapLink  = document.getElementById('osm-link');
    const mapWrap  = document.getElementById('osm-map-wrap');

    if (mapFrame && mapWrap) {
      mapFrame.src = osmEmbed;
      if (mapLink) mapLink.href = osmFull;
      mapWrap.style.display = 'block';
    }
  }

  // ── Sidebar: Best Time to Visit ───────────────────────────────────
  setText('info-best-time', a.best_time_to_visit ?? '—');

  // ── Sidebar: Quick Facts ──────────────────────────────────────────
  const regionName = a.region?.name ?? a.region_name ?? '—';
  setText('fact-region', regionName);
  setHTML('fact-category', categoryBadge(a.category_display));
  setHTML('fact-featured',
    a.is_featured
      ? `<span class="inline-flex items-center gap-1 bg-tz-savanna/20 text-tz-savanna text-xs font-semibold px-2.5 py-1 rounded-full">
           <i data-lucide="star" class="w-3 h-3"></i> Featured
         </span>`
      : `<span class="text-tz-muted text-xs">—</span>`
  );

  // Re-run Lucide to pick up icons injected into the DOM above
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ── 4. populateWeather ────────────────────────────────────────────────

/**
 * Maps an Open-Meteo weather_code to a Lucide icon name.
 * Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
 *
 * @param {number} code
 * @returns {string} Lucide icon name
 */
function weatherCodeToIcon(code) {
  if (code === 0 || code === 1) return 'sun';
  if (code === 2)               return 'cloud-sun';
  if (code === 3)               return 'cloud';
  if (code === 45 || code === 48) return 'cloud-fog';
  if (code >= 51 && code <= 55) return 'cloud-drizzle';
  if (code >= 61 && code <= 67) return 'cloud-rain';
  if (code >= 80 && code <= 82) return 'cloud-rain';
  if (code >= 95)               return 'cloud-lightning';
  return 'cloud'; // fallback for any unrecognised code
}

/**
 * Populates the weather widget with current conditions.
 * The widget background gradient comes from .weather-widget in styles.css.
 *
 * @param {Object} weather  current_weather object from the API
 */
function populateWeather(weather) {
  if (!weather) return;

  // Temperature: round to one decimal place
  setText('weather-temp',     `${Math.round(weather.temperature ?? 0)}°C`);
  setText('weather-desc',     weather.weather_description ?? '—');
  setText('weather-wind',     weather.wind_speed != null ? `${weather.wind_speed} km/h` : '—');
  setText('weather-humidity', weather.humidity   != null ? `${weather.humidity}%`       : '—');

  // Swap the icon element's data-lucide attribute and re-run lucide.createIcons
  const iconEl = document.getElementById('weather-icon');
  if (iconEl) {
    const iconName = weatherCodeToIcon(weather.weather_code ?? 0);
    iconEl.setAttribute('data-lucide', iconName);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

// ── 5. loadSimilar ────────────────────────────────────────────────────

/**
 * Fetches all attractions, filters to the same region (excluding the
 * current attraction), takes the first 3, and renders cards into
 * #similar-grid.
 *
 * @param {string} currentSlug   Slug of the currently displayed attraction
 * @param {string} regionName    Region name to match (e.g. "Arusha")
 */
async function loadSimilar(currentSlug, regionName) {
  const grid = document.getElementById('similar-grid');
  if (!grid) return;

  try {
    const all = await api.getAttractions();

    // Keep only same-region attractions, excluding the current one
    const similar = all
      .filter(a => a.region_name === regionName && a.slug !== currentSlug)
      .slice(0, 3);

    if (!similar.length) {
      grid.innerHTML = `<p class="text-tz-muted col-span-full text-sm">No other attractions found in this region.</p>`;
      return;
    }

    // Render compact cards — same visual style as attractions.js grid cards
    grid.innerHTML = similar.map(a => `
      <article class="attraction-card rounded-2xl overflow-hidden shadow-sm bg-white group"
               data-aos="fade-up">

        <div class="relative aspect-video overflow-hidden">
          <img src="${a.featured_image || 'images/photo-1547036967-23d11aacaee0.jpg'}"
               alt="${a.name}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               loading="lazy" />
          <div class="absolute top-3 left-3">
            <span class="badge-category text-xs font-semibold px-2 py-0.5 rounded-full">
              ${a.category_display}
            </span>
          </div>
        </div>

        <div class="p-5">
          <h3 class="font-display text-lg font-bold text-tz-dark mb-1 line-clamp-1">${a.name}</h3>
          <p class="text-tz-muted text-sm mb-3 flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 shrink-0" aria-hidden="true"></i>
            ${a.region_name}
          </p>
          <p class="text-tz-muted text-sm line-clamp-2 mb-4">${a.short_description}</p>

          <div class="flex items-center justify-between">
            <span class="badge-${a.difficulty_level} text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
              ${a.difficulty_level}
            </span>
            <a href="attraction.html?slug=${a.slug}"
               class="text-sm font-semibold text-tz-forest hover:text-tz-forest/80
                      flex items-center gap-1 transition-colors">
              View
              <i data-lucide="arrow-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    // Render newly injected Lucide icon placeholders
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Trigger AOS on newly rendered elements
    if (typeof AOS !== 'undefined') AOS.refresh();

  } catch (err) {
    console.warn('[attraction] loadSimilar failed:', err.message);
    grid.innerHTML = `<p class="text-tz-muted col-span-full text-sm">Could not load similar attractions.</p>`;
  }
}

// ── 6. initShare ──────────────────────────────────────────────────────

/**
 * Wires up the Share button.
 *
 * Strategy:
 *   1. If the browser supports navigator.share (mobile / some desktop),
 *      call it with the attraction title, short description, and current URL.
 *   2. Otherwise fall back to copying the URL to the clipboard.
 *
 * Shows a brief feedback message to confirm the action.
 *
 * @param {Object} a  Attraction detail object
 */
function initShare(a) {
  const btn = document.getElementById('share-btn');
  const feedback = document.getElementById('share-feedback');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const url = window.location.href;

    if (navigator.share) {
      // Web Share API — triggers native share sheet on mobile
      try {
        await navigator.share({
          title: `${a.name} — Twenzetu Safari`,
          text:  a.short_description ?? `Discover ${a.name} in Tanzania.`,
          url,
        });
      } catch (err) {
        // User cancelled the share dialog — not an error worth logging loudly
        if (err.name !== 'AbortError') {
          console.warn('[attraction] share failed:', err.message);
        }
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        if (feedback) {
          feedback.textContent = 'Link copied to clipboard!';
          feedback.classList.remove('hidden');
          // Hide the feedback after 2.5 seconds
          setTimeout(() => feedback.classList.add('hidden'), 2500);
        }
      } catch (err) {
        console.warn('[attraction] clipboard copy failed:', err.message);
      }
    }
  });
}

// ── 7. init ───────────────────────────────────────────────────────────

/**
 * Main entry point. Called on DOMContentLoaded.
 *
 * Orchestrates:
 *  - slug extraction
 *  - concurrent API calls for detail + weather
 *  - DOM population
 *  - gallery mount
 *  - similar attractions load
 */
async function init() {
  const slug = getSlug();

  // ── No slug provided ──────────────────────────────────────────────
  if (!slug) {
    setText('attraction-name', 'No attraction specified.');
    // Hide the gallery section — nothing to show without a slug
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) gallerySection.classList.add('hidden');
    return;
  }

  try {
    // ── Fetch detail and weather concurrently ─────────────────────
    // Promise.all fires both requests at the same time rather than
    // waiting for one to complete before starting the other.
    const [attraction, weather] = await Promise.all([
      api.getAttraction(slug),
      api.getWeather(slug),
    ]);

    // ── Populate DOM ──────────────────────────────────────────────
    populateDetail(attraction);
    initGallery(attraction.images);
    populateWeather(weather);

    // Update browser tab title
    document.title = `${attraction.name} — Twenzetu Safari`;

    // Load similar attractions (non-blocking — failure is handled inside)
    const regionName = attraction.region?.name ?? attraction.region_name;
    await loadSimilar(slug, regionName);

    // Wire up the share button
    initShare(attraction);

  } catch (err) {
    // ── API error or slug not found ────────────────────────────────
    console.error('[attraction] init failed:', err.message);

    // Show a friendly error in the H1 so the page still makes sense
    setText('attraction-name', 'Attraction not found.');
    setHTML('attraction-region',
      `<span class="text-white/70 text-base">
         We couldn't load this attraction. Please check the URL or
         <a href="attractions.html" class="underline hover:text-white">browse all attractions</a>.
       </span>`
    );

    // Hide the gallery slides area — no images to show on error
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      // Provide a dark fallback background so the overlay text is visible
      gallerySection.style.background = 'linear-gradient(135deg, #1A4731 0%, #111827 100%)';
    }
  }
}

// ── Kick off on DOM ready ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
