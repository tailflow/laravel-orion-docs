<p align="center">
<img src="https://res.cloudinary.com/dudxt4lp6/image/upload/v1717408304/orion-for-laravel-logo_uqyyz3.png" width="400">
</p>

## Documentation

Documentation can be found on the [website](https://orion.tailflow.org).

## Deployment

The site is fully prerendered (`pnpm generate`) and hosted on Cloudflare Workers via
[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) connected to this repository:

- Build command: `pnpm generate`
- Deploy command: `npx wrangler deploy`

Wrangler detects the Nuxt project and generates the Workers configuration automatically.
