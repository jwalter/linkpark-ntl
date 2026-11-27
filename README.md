# linkpark-ntl

This is a simple [Svelte](https://svelte.dev) app that displays number of free parking spaces in public parking garages in Linköping, Sweden. The backend API is provided by https://api.dukaten.parkknowit.com/api/parkings, proxied through Netlify to enable CORS and https. A live version is available at https://p.waltersson.com.

Built with Svelte 5, Tailwind CSS 4 and Vite. Requires Node 22.12 or later.

```sh
npm install
npm run dev      # dev server; proxies /api to the parking API like Netlify does
npm run check    # type-check
npm run build    # production build in dist/
```
