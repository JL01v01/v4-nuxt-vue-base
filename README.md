# Internal Design System - Nuxt 4 + Vue 3 + Tailwind 4

A modern design system platform built with the latest stable versions of Nuxt 4, Vue 3.5, and Tailwind 4.

## Tech Stack

- **Nuxt**: 4.2.1 (latest)
- **Vue**: 3.5.25 (latest)
- **Tailwind CSS**: 4.1.17 (latest)
- **reka-ui**: 2.6.1 (component primitives)
- **lucide-vue-next**: 0.555.0 (icons)
- **vee-validate**: 4.15.1 + zod 3.25.76 (form validation)
- **Deployment**: Cloudflare (via wrangler)

For a complete dependency list, see [package.json](./package.json).

## Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm/yarn/bun

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# pnpm (recommended)
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm (recommended)
pnpm dev

# npm
npm run dev

# yarn
yarn dev

# bun
bun run dev
```

**Note**: You may see warnings about font providers (Google Fonts, Bunny Fonts, etc.) in restricted network environments. These are expected and do not affect development functionality.

## Type Checking

Run TypeScript type checking:

```bash
pnpm typecheck
```

## Production

Build the application for production:

```bash
# pnpm (recommended)
pnpm build

# npm
npm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# pnpm (recommended)
pnpm preview

# npm
npm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Deployment

This project is configured for Cloudflare deployment. After building:

```bash
npx wrangler deploy .output/server/index.mjs --assets .output/public
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Dependency Management

All dependencies are kept at their latest stable versions. The only exception is:

- **zod** is pinned to v3.25.76 (latest v3.x) to maintain compatibility with `@vee-validate/zod` which requires `zod@^3.24.0`

To check for updates:
```bash
pnpm outdated
```
