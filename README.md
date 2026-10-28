# Master painting website

Master template. Don't customize here — generate a client with `npm run create-client` from the workspace
root (see `../README.md`). Develop the template itself with:

```bash
npm install
npm run dev        # preview
npm run build      # production build (runs sitemap script first)
npm run typecheck && npm run lint
```
Config: `src/config/site.config.json` (validated by `src/config/schema.ts`). Default copy: `src/config/defaults.ts`.
