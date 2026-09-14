
# LyfeTools
![GitHub last commit](https://img.shields.io/github/last-commit/lyfesan/LyfeTools)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/lyfesan/LyfeTools/deploy.yml)
![GitHub License](https://img.shields.io/github/license/lyfesan/LyfeTools)


LyfeTools is a collection of small, practical utilities for everyday tasks. This project aims to provide useful tools that perform their work entirely on the client side without sending user data to a server for processing.

## Tools List

See [TOOL_LIST.md](TOOL_LIST.md) for the current tool catalog, supported unit categories, and planned tools.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- `decimal.js` for unit conversion arithmetic
- `oxlint` for linting

## Project Structure

```text
src/
├── components/       Reusable UI components
├── config/           Application configuration
├── data/             Tool and unit definitions
├── hooks/            Shared React hooks
├── layouts/          Shared page layouts
├── pages/            Route-level page components
├── routes/           Router configuration and paths
├── services/         Application services
├── styles/           Design tokens and typography
├── types/            Shared TypeScript types
└── utils/            Utility functions, including converters
```

## License

LyfeTools is licensed under the [GNU General Public License v3.0](LICENSE).

