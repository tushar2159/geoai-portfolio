# Tushar Katkar — GeoAI Portfolio

A public portfolio website for showcasing GeoAI, remote sensing, computer vision,
spatial product engineering and AI-system capabilities.

The site is the entry point to one connected product experience:

`Portfolio → Cesium Earth Explorer → selected AOI → Agentic Earth Intelligence`

The token-free [Earth Explorer](https://tushar2159.github.io/geoai-portfolio/explorer/) supports curated public-place search, latitude/longitude input, click-anywhere AOI selection, selectable radius, public demo scenarios, and an encoded handoff to the Analyst. The user must confirm before analysis runs.

## Deployment model

- The portfolio and Explorer are static GitHub Pages applications.
- They never imply that Python runs in GitHub Pages.
- No private Cesium, Mapbox, AWS, or geocoding token is required.
- Pixel-level EO processing belongs to the optional FastAPI backend documented in `agentic-earth-intelligence`.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the system boundary.

## Run locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Deploy with GitHub Pages

1. Create a new **public** repository, e.g. `geoai-portfolio`.
2. Upload all files from this folder to the repository root.
3. GitHub repository → **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Your site will become available at:
   `https://tushar2159.github.io/geoai-portfolio/`

## Important

The portfolio is intentionally generalized and does not disclose client names, employer-specific
workflows, proprietary datasets, private AOIs, commercial KPIs, credentials, or confidential
production architecture.
