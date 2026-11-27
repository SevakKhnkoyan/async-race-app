# Async Race

A browser-based racing simulator built with React and TypeScript. Manage a virtual garage, coordinate asynchronous races and track winners through a REST API.

**[Live frontend](https://async-race-app-sage.vercel.app/)** · **[Required backend](https://github.com/mikhama/async-race-api)**

## Features

- Create, edit and delete cars, choose colors and generate 100 randomized cars.
- Start and stop individual cars or race all cars on the current page; reset the race and announce the winner.
- Browse a paginated garage and a sortable winners table with win counts and best times.
- Preserve garage and winners view state when navigating between views.

## Engineering highlights

- React 19, TypeScript and Vite for the frontend.
- Redux Toolkit slices for UI state and RTK Query for REST requests, caching and tag-based invalidation.
- Redux listener middleware to persist winner results and update existing records.
- Component-level race controls and SCSS styling.

## Run locally

The frontend requires the separate [Async Race API](https://github.com/mikhama/async-race-api). Start it according to its README and ensure it is available at `http://127.0.0.1:3000`. The frontend currently targets this address, including in the hosted demo.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type-check and production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |

## Source layout

```text
src/
  components/   Shared header, footer and loader
  pages/        Garage, car controls and winners
  services/     RTK Query API definitions
  store/        Redux slices, hooks and listener middleware
  constants.ts  Garage configuration and car data
  utils.ts      Shared utilities
```

## Project background

Built as a frontend engineering assessment focused on asynchronous workflows, state management and API integration. The original task checklist is preserved in [docs/assessment.md](docs/assessment.md).
