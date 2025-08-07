# Bug Tracker App
<p>This is a project meant to demonstrate full stack development skills as well as concepts such as testing (Unit, Component, Integration, E2E, etc.), containerization, etc.

NOTE: This project is a work-in-progress

## Frontend:  React + TypeScript + Vite
Directory: `client`
Uses:
- Node
- React + Vite
- TypeScript
- Vitest + React Testing Library for testing

### Starting server
#### Dev mode
- Run using `npm run dev`

#### Vitetest + RTL (React Testing Library)
- Run vite tests:
  - `npx vitest run`

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ESLint Setup

This project uses ESLint to enforce code quality and consistency for TypeScript and React code.

### Installation

Ensure the following development dependencies are installed:
```
npm install -D eslint@8.57.0 \
  @typescript-eslint/parser@7.8.0 \
  @typescript-eslint/eslint-plugin@7.8.0 \
  eslint-plugin-react@7.34.1 \
  eslint-plugin-react-hooks@4.6.0 \
  eslint-plugin-jsx-a11y@6.7.1
```

### Configuration

The ESLint configuration is defined using the flat config format in eslint.config.ts. It includes:
  - ESLint recommended rules for JavaScript and TypeScript
  - React and React Hooks best practices
  - Accessibility rules via jsx-a11y
  - Custom formatting rules (quotes, semicolons, spacing, etc.)

The dist directory is excluded from linting.

### Running the Linter

To lint all files:
`npm run lint`

This uses the following command:
`eslint .`

### Autofixing Issues
To automatically fix fixable problems:
`npm run lint -- --fix`

You can also run it directly:
`npx eslint . --fix`

Only rules that support autofix will be corrected automatically.

### Notes
- ESLint's flat config does not support some legacy CLI flags such as --ext. File patterns should be defined in the config file.
- Some issues like unused variables cannot be auto-fixed and must be resolved manually.