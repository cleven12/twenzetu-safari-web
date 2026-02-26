# Twenzetu Safari Web

> *Journey Together, Discover Tanzania* -- A free, open-source Progressive Web App (PWA) showcasing Tanzania's tourist attractions with interactive OpenStreetMap maps, real-time weather, and GPS-accurate data.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8.svg)](manifest.json)
[![OpenStreetMap](https://img.shields.io/badge/Maps-OpenStreetMap-7EBC6F.svg)](https://www.openstreetmap.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)

**Backend API:** [twenzetu-safari](https://github.com/cleven12/twenzetu-safari)

---

## About

**Twenzetu Safari** is a pure HTML/CSS/JS Progressive Web App (PWA) that connects to the **Twenzetu Safari REST API** (Django REST Framework). No build step required -- open any `.html` file or serve the folder with any static web server.

From the snows of Kilimanjaro to the turquoise shores of Zanzibar -- this platform brings Tanzania's wonders to the world, completely free and open source.

---

## Project Structure

```
twenzetu-safari-web/
+-- index.html          # Home page
+-- attractions.html    # Browse all attractions
+-- attraction.html     # Attraction detail (GPS map, weather, gallery)
+-- regions.html        # Browse regions
+-- about.html          # About the project
+-- sponsor.html        # Sponsor the project
+-- css/
|   `-- styles.css      # Custom styles
+-- js/
|   +-- api.js          # API client (Twenzetu Safari REST API)
|   +-- home.js         # Home page logic
|   +-- attraction.js   # Attraction detail logic + OSM map
|   +-- attractions.js  # Attractions listing logic
|   +-- about.js        # Contributors loader
|   +-- mockdata.js     # Offline fallback data
|   `-- scripts.js      # Shared utilities
+-- images/             # Static assets & PWA icons
+-- manifest.json       # PWA manifest
`-- sw.js               # Service worker (offline support)
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/cleven12/twenzetu-safari-web.git
cd twenzetu-safari-web

# Serve with any static server (no build step needed)
npx serve .
# or
python3 -m http.server 8080
```

**Opens at:** `http://localhost:8080`

> **API:** By default the app points to the Twenzetu Safari API. Edit `js/api.js` to change the `BASE_URL` for local development.

---

## Tech Stack

| Layer    | Technology                                              |
|----------|---------------------------------------------------------|
| Markup   | Semantic HTML5                                          |
| Styles   | Tailwind CSS v4 (browser build) + custom CSS            |
| Scripts  | Vanilla JavaScript (ES2020+)                            |
| Maps     | OpenStreetMap via iframe embed (no API key needed)      |
| Weather  | Open-Meteo API (free, no key)                           |
| Icons    | Lucide Icons                                            |
| Animations | AOS (Animate On Scroll)                               |
| Gallery  | Splide.js carousel                                      |
| PWA      | Service Worker + Web App Manifest                       |
| Backend  | Twenzetu Safari REST API (Django REST Framework)        |

---

## Pages

| Page              | File               | Description                                              |
|-------------------|--------------------|----------------------------------------------------------|
| Home              | `index.html`       | Hero, featured attractions, regions overview             |
| Attractions       | `attractions.html` | Searchable and filterable attractions grid               |
| Attraction Detail | `attraction.html`  | Gallery, weather, interactive OSM map, GPS coords        |
| Regions           | `regions.html`     | Tanzania regions with attraction counts                  |
| About             | `about.html`       | Project info and contributors                            |
| Sponsor           | `sponsor.html`     | Support the project                                      |

---

## Interactive Maps

Attraction detail pages embed a live **OpenStreetMap** iframe centered on the attraction's GPS coordinates. No API key required -- 100% free and open source.

```html
<!-- OSM iframe auto-generated from attraction lat/lng -->
<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=...&marker=lat,lng"
  ...
></iframe>
```

---

## API Integration

Edit `js/api.js` to configure your backend:

```js
const BASE_URL = 'https://your-twenzetu-safari-api.com/api/v1';
```

Key endpoints consumed:

```
GET /attractions/             -> attractions listing
GET /attractions/:id/         -> attraction detail (includes lat, lng)
GET /attractions/:id/weather/ -> real-time weather
GET /regions/                 -> regions list
GET /contributors/            -> project contributors
```

---

## Features

- [x] Attraction gallery with full-screen slideshow
- [x] Real-time weather (temperature, wind, humidity, UV index)
- [x] Interactive OpenStreetMap embed with GPS pin
- [x] Region browsing
- [x] Search and category filters
- [x] Share attraction (Web Share API + clipboard fallback)
- [x] PWA -- installable, works offline with cached data
- [x] Responsive design (mobile-first)
- [x] Accessible (ARIA labels, semantic HTML)

---

## Contributing

Contributions are welcome! See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the list of contributors.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push and open a Pull Request

---

## License

MIT License -- Free to use, modify, and distribute. See [LICENSE](LICENSE).

---

**Twenzetu Safari -- Journey Together, Discover Tanzania**


## Project Structure

```
twenzetu-safari-web/
 index.html          # Home page
 attractions.html    # Browse all attractions
 attraction.html     # Attraction detail (GPS map, weather, gallery)
 regions.html        # Browse regions
 about.html          # About the project
 sponsor.html        # Sponsor the project
 css/
    styles.css      # Custom styles
 js/
    api.js          # API client (Twenzetu Safari REST API)
    home.js         # Home page logic
    attraction.js   # Attraction detail logic + OSM map
    attractions.js  # Attractions listing logic
    about.js        # Contributors loader
    mockdata.js     # Offline fallback data
    scripts.js      # Shared utilities
 images/             # Static assets & PWA icons
 manifest.json       # PWA manifest
 sw.js               # Service worker (offline support)
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/cleven12/twenzetu-safari-web.git
cd twenzetu-safari-web

# Serve with any static server (no build step needed)
npx serve .
# or
python3 -m http.server 8080
```

**Opens at:**`http://localhost:8080`

>**API:**By default the app points to the Twenzetu Safari API. Edit `js/api.js` to change the `BASE_URL` for local development.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styles | Tailwind CSS v4 (browser build) + custom CSS |
| Scripts | Vanilla JavaScript (ES2020+) |
| Maps |**OpenStreetMap**via iframe embed (no API key needed) |
| Weather | Open-Meteo API (free, no key) |
| Icons | Lucide Icons |
| Animations | AOS (Animate On Scroll) |
| Gallery | Splide.js carousel |
| PWA | Service Worker + Web App Manifest |
| Backend | Twenzetu Safari REST API (Django REST Framework) |

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured attractions, regions overview |
| Attractions | `attractions.html` | Searchable & filterable attractions grid |
| Attraction Detail | `attraction.html` | Gallery, weather,**interactive OSM map**, GPS coords |
| Regions | `regions.html` | Tanzania regions with attraction counts |
| About | `about.html` | Project info & contributors |
| Sponsor | `sponsor.html` | Support the project |

---

## Interactive Maps

Attraction detail pages embed a live**OpenStreetMap**iframe centered on the attraction's GPS coordinates. No API key required  100% free and open source.

```html
<!-- OSM iframe auto-generated from attraction lat/lng -->
<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=...&marker=lat,lng"
  ...
></iframe>
```

---

## API Integration

Edit `js/api.js` to configure your backend:

```js
const BASE_URL = 'https://cf89615f228bb45cc805447510de80.pythonanywhere.com/api/v1';
```

Key endpoints consumed:

```
GET /attractions/           attractions listing
GET /attractions/:id/       attraction detail (includes lat, lng)
GET /attractions/:id/weather/  real-time weather
GET /regions/               regions list
GET /contributors/          project contributors
```


---


## Features

- Attraction gallery with full-screen slideshow
- Real-time weather (temperature, wind, humidity, UV index)
- Interactive**OpenStreetMap**embed with GPS pin
- Region browsing
- Search & category filters
- Share attraction (Web Share API + clipboard fallback)
- PWA  installable, works offline with cached data
- Responsive design (mobile-first)
- Accessible (ARIA labels, semantic HTML)

---

## Contributing

Contributions are welcome! See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the list of contributors.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push and open a Pull Request

---

## License

MIT License  Free to use, modify, and distribute. See [LICENSE](LICENSE).

---

**Twenzetu Safari  Journey Together, Discover Tanzania**