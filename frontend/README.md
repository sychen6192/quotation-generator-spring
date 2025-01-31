# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

my-vite-app/
├── public/ # Static assets directly served at the root
│ ├── favicon.ico # Website favicon
│ ├── robots.txt # Robots.txt for search engines
│ ├── images/ # Static images (optional)
│ └── other-static-files # Other static resources
├── src/ # Main source code
│ ├── assets/ # Internal static assets processed by Vite
│ │ ├── images/ # Image assets (importable in code)
│ │ ├── fonts/ # Font files
│ │ └── styles/ # Global styles (CSS/SCSS)
│ ├── components/ # Reusable UI components
│ │ ├── Button.tsx # Example: Button component
│ │ ├── Header.tsx # Example: Header component
│ │ └── Footer.tsx # Example: Footer component
│ ├── hooks/ # Custom React hooks
│ │ └── useFetch.ts # Example: Fetch data hook
│ ├── layouts/ # Layout components (Header/Footer/Sidebar)
│ │ └── MainLayout.tsx # Main layout for pages
│ ├── pages/ # Application pages
│ │ ├── HomePage.tsx # Home page
│ │ ├── AboutPage.tsx # About page
│ │ └── NotFound.tsx # 404 page
│ ├── routes/ # Application routing configuration
│ │ └── routes.tsx # Route definitions
│ ├── services/ # API services
│ │ └── api.ts # Centralized API call logic
│ ├── utils/ # Utility functions
│ │ ├── forma
