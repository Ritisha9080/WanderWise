# WanderWise

**Dream it. Plan it. Explore it.** WanderWise is a responsive, browser-only travel planner built with HTML, CSS, and JavaScript. It helps you explore destinations, create a curated itinerary, estimate trip costs, save a wishlist, and track a preparation checklist.

## Features

- Destination explorer with Europe, Nepal, Switzerland, Italy, and Bali.
- A 3, 5, or 7 day suggested itinerary shaped by travel style and selected interests. Suggestions are curated local data, not live AI or real-time recommendations.
- Budget calculator with input validation and estimated remaining budget.
- Wishlist and travel checklist saved in the current browser using `localStorage`.
- Responsive navigation and layout for mobile and desktop.

The project does not use a backend, API keys, or paid services. Wishlist and checklist information stays in browser storage on the device. It is not sensitive storage and may be cleared by the browser.

## Preview locally

Open `index.html` in a browser, or run a static server from this directory:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

1. Put `index.html`, `script.js`, `style.css`, and this README in the root of your GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the branch you want to publish and the `/ (root)` folder, then save.
4. GitHub Pages will provide the site URL. For a repository named `WanderWise`, it is typically `https://USERNAME.github.io/WanderWise/`.

The current `index.html` is self-contained: its CSS and JavaScript are embedded, so it works when served from the repository root or a repository subpath. `style.css` and `script.js` are maintained as separate source copies for easier editing; if you change either one, copy the updated contents into the matching embedded section of `index.html` before publishing. The app has no root-relative links or local asset paths that break under a repository subpath.

## External assets and browser policy

Destination and decorative photos are requested from Unsplash, and typography is requested from Google Fonts. The site falls back to system fonts and a gradient image placeholder if external assets do not load. An HTML Content Security Policy allows the page’s inline script by a SHA-256 hash and permits same-origin files plus the listed image and font hosts. If you edit the inline script in `index.html`, update its SHA-256 hash in the CSP meta tag or the browser will block it. GitHub Pages does not let this static project configure response headers; the policy is therefore delivered as an HTML meta policy.
