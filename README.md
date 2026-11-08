# LyfeTools

![GitHub last commit](https://img.shields.io/github/last-commit/lyfesan/LyfeTools)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/lyfesan/LyfeTools/deploy.yml)
![GitHub License](https://img.shields.io/github/license/lyfesan/LyfeTools)

LyfeTools is a collection of practical browser-based utilities. Tools run locally in your browser and do not send entered data to a server for processing.

## Available tools

- **Unit Converter** — convert time, length, mass, temperature, and electric current using arbitrary-precision arithmetic.
- **QR Code Generator** — create QR codes from text or URLs, adjust error correction and mask pattern, preview QR metadata, and download as PNG, JPG, or SVG.

Image conversion, document conversion, and the Pomodoro timer are planned. See [TOOL_LIST.md](TOOL_LIST.md) for the current tool catalog.

## Tech stack

- React 19 and TypeScript
- Vite
- React Router
- Tailwind CSS 4 and shared shadcn-style UI components
- `decimal.js` for unit conversion arithmetic
- Project Nayuki's QR Code Generator Library
- `oxlint` for linting

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL after the server starts.

## Scripts

```sh
npm run dev      # Start the development server
npm run build    # Type-check and create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Lint the project with oxlint
```

## Project structure

```text
src/
├── assets/       Static assets
├── components/   Shared application and UI components
├── data/         Tool and unit definitions
├── hooks/        Shared React hooks
├── layouts/      Shared page layouts
├── pages/        Route-level pages and tools
├── routes/       Router configuration and paths
├── styles/       Design tokens and typography
├── types/        Shared TypeScript types
└── utils/        Conversion and QR-generation utilities
```

## Licenses

LyfeTools is licensed under the [GNU General Public License v3.0](LICENSE). Third-party software and asset notices are available on the website's [Third-party licenses page](/licenses).
