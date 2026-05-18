## Sub-path deployment

If you already host multiple services on a single domain, you can run this customized Scrypted management UI under a sub-path (for example `https://selfhosted.example.com/dashboard/`) instead of consuming a dedicated subdomain. This lets Scrypted coexist with other apps on the same site while still proxying its API and WebSocket traffic correctly.

When building the UI for sub-path hosting, make sure the Vue base path matches the mount point:

```sh
npm run build -- --base=/dashboard/
```

As an alternative, set `base: '/dashboard/'` in `vite.config.mts` for your production build.

Also ensure the UI's Scrypted client base URL is `/dashboard/scrypted/`; otherwise API requests will point to the wrong path.

WebSocket connections work transparently through Caddy because it automatically handles connection upgrades when reverse proxying.

To switch to the sub-path Caddy variant:

```sh
cp Caddyfile.subpath Caddyfile
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```
