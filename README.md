# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# React + Vite

# Global Heritage

Global Heritage is a small React app built with Vite that showcases cultural landmarks and heritage data. It provides a fast development setup, an opinionated folder structure, and basic linting to help collaborators get started quickly.

## Tech stack

- React 19 + Vite
- React Router for client routing
- ESLint for linting

## Goal

Make it easy for contributors to view, edit, and add pages that present heritage sites, galleries, and informational content.

## Quick start

Prerequisites:

- Node.js 18+ and a package manager (npm, pnpm, or yarn)

Install and run locally:

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

Useful scripts (from package.json):

- `dev`: start Vite dev server
- `build`: create production build
- `preview`: serve the production build locally
- `lint`: run ESLint across the project

## Project structure

- `index.html` — app entry HTML
- `src/main.jsx` — React entry point
- `src/App.jsx` — top-level app component
- `src/pages/` — route pages (add new pages here)
- `src/components/` — reusable UI components
- `src/assets/` — static images and media
- `public/` — static files copied to build output

If you add routes, register them in the router inside `src/main.jsx` / `src/App.jsx`.

## Linting & code style

Run linting with:

```bash
npm run lint
```

The project includes ESLint config at the repository root. Please run lint and fix issues before opening pull requests.

## Contributing

- Fork the repo and create a feature branch.
- Add or update content under `src/pages` and `src/components`.
- Run `npm run dev` to preview changes locally.
- Open a pull request describing the change and any manual test steps.

## Notes for reviewers

- Keep UI changes small and focused per PR.
- If adding large datasets or media, prefer linking or using `public/` to avoid inflating repo size.

## Need help?

If you have questions or want a walkthrough, open an issue or mention a maintainer in the PR.

---

File: [README.md](README.md)
