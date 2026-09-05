# Dubai Hair Shop

A static mockup storefront for Dubai Hair Shop, covering its three product lines:

- **Hair Extensions** — virgin human hair bundles, wigs, and lace fronts
- **Fashion Design** — bespoke African-inspired couture by Alicia Tally
- **Natural Skincare** — organic, African-botanical skincare products

## Project Structure

```
.
├── index.html          # All page markup
├── css/
│   └── style.css       # All styles
├── js/
│   ├── hero-slider.js         # Hero carousel (Swiper)
│   ├── testimonial-slider.js  # Testimonials carousel (Swiper)
│   └── mobile-nav.js          # Hamburger slide-out menu toggle
├── img/                 # Product, hero, and category images
└── favicon.svg
```

## Running Locally

This is a static site with no build step. Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```
python3 -m http.server
```

## Tech

- Vanilla HTML/CSS/JS
- [Swiper.js](https://swiperjs.com) (via CDN) for the hero and testimonial carousels
- Google Fonts: Playfair Display, Pinyon Script, Inter

## Deploying

Files are uploaded manually to the host. Because the CSS/JS files are cache-busted with a version query string (e.g. `css/style.css?v=1`), **bump that version number in `index.html` whenever you change `style.css` or a script**, so visitors' browsers (and the host's cache) fetch the new file instead of a stale cached copy.
