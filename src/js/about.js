/**
 * about.js — About / Contributors page
 *
 * Fetches contributors from the GitHub API and renders contributor cards.
 * Falls back gracefully if the API is rate-limited or unavailable.
 */

const GITHUB_REPO = 'cleven12/twenzetu-safari-web';

/**
 * Fetches contributors from the GitHub API.
 * The public endpoint has a 60 requests/hour limit for unauthenticated users.
 */
async function loadContributors() {
  const grid = document.getElementById('contributors-grid');
  if (!grid) return;

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=20`);
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const contributors = await res.json();

    if (!contributors.length) {
      grid.innerHTML = `<p class="col-span-full text-tz-muted text-center text-sm">No contributors found yet. Be the first!</p>`;
      return;
    }

    grid.innerHTML = contributors.map(c => `
      <a href="${c.html_url}" target="_blank" rel="noopener noreferrer"
         class="contributor-card bg-white rounded-xl p-5 shadow-sm border border-gray-100
                flex flex-col items-center text-center"
         data-aos="fade-up">
        <img src="${c.avatar_url}&s=80" alt="${c.login}" class="w-14 h-14 rounded-full mb-3 shadow-sm" loading="lazy" />
        <span class="font-semibold text-tz-dark text-sm">${c.login}</span>
        <span class="text-xs text-tz-muted mt-1">${c.contributions} contribution${c.contributions !== 1 ? 's' : ''}</span>
      </a>
    `).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();

  } catch (err) {
    console.warn('[about] Failed to load contributors:', err.message);
    grid.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-tz-muted text-sm mb-3">Could not load contributors from GitHub. They may be rate-limited.</p>
        <a href="https://github.com/${GITHUB_REPO}/graphs/contributors" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 text-sm font-semibold text-tz-forest hover:text-tz-forest/80 transition-colors">
          <i data-lucide="external-link" class="w-4 h-4"></i> View contributors on GitHub
        </a>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', loadContributors);
