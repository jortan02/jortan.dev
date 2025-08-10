# jortan.dev

Personal portfolio website built with Next.js and Contentlayer.

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Contentlayer2 for Markdown content
- Playwright for E2E/UI testing
- Vitest + Testing Library for unit/component/API tests

## Requirements

- Node.js 18+ (LTS recommended)
- npm 9+

## Getting Started

1) Install dependencies

```
npm install
```

2) Configure environment (only required for the chat API endpoint)

Create `.env.local` and set:

```
HUGGINGFACE_API_KEY=...
QDRANT_URL=...
QDRANT_API_KEY=...
OPENROUTER_API_KEY=...
```

3) Run the dev server

```
npm run dev
```

Visit `http://localhost:3000`.

## Scripts

- `dev`: start Next.js dev server
- `build`: production build
- `start`: start production server
- `build:content`: build Contentlayer output
- `lint`: run ESLint
- `test`: run unit/component/API tests (watch)
- `test:coverage`: run tests with coverage
- `e2e`: run Playwright tests (expects a built app)

## Project Structure

- `src/app/`: App Router pages and API routes
- `src/components/`: UI and app components
- `src/content/portfolio/`: Markdown content for portfolio items
- `src/lib/`, `src/utils/`: utilities
- `tests/`: Vitest setup and mocks
- `e2e/`: Playwright tests

## Content Authoring

- Add/edit Markdown files in `src/content/portfolio/`
- Contentlayer generates typed data used in pages

## Testing

- Unit/Component/API (Vitest + Testing Library)
  - `npm test`
  - See examples under `src/**/*.test.ts(x)`
- E2E/UI (Playwright)
  - First run: `npx playwright install`
  - Build: `npm run build`
  - Run: `npm run e2e`

## Deployment

- Build with `npm run build` and serve with `npm start`
- For Vercel: connect the repo; default Next.js settings work

## Resources and Inspirations

During the development of this website, I referred to the following resources:

- [Next.js Documentation – Official Guide](https://nextjs.org/docs)
- [Tailwind CSS Documentation – Utility-First Styling](https://tailwindcss.com/docs/)
- [Chronark's Personal Website Source Code (Next.js + Tailwind)](https://github.com/chronark/chronark.com/)
- [Building a Next.js Portfolio with Notion and Markdown](https://www.kodaps.dev/en/blog/nextjs-project-portfolio-notion-markdown)
- [Integrating Next.js Image Component in Markdown Posts](https://scastiel.dev/nextjs-image-in-markdown)
- [Tailwind CSS: Creating Grids with Unequal Heights](https://stackoverflow.com/questions/72158991/grid-of-unequal-heights-in-tailwindcss)
- [Implementing 'Go Back' Navigation in Next.js](https://stackoverflow.com/questions/51843119/next-js-react-go-back-to-the-previous-page)
- [Sorting Dates Correctly in TypeScript](https://stackoverflow.com/questions/40248643/typescript-sort-by-date-not-working)
- [Creating a Sticky Navbar with JavaScript and CSS](https://www.w3schools.com/howto/howto_js_navbar_sticky.asp)
- [Next.js GitHub Issue: App Router Static Export Compatibility (#51860)](https://github.com/vercel/next.js/issues/51860)
