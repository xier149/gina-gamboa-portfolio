# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Ask Gina's AI

The portfolio includes a server-side Gemini chat function at `/api/chat`. The approved portfolio facts are maintained in [`api/portfolio-knowledge.js`](api/portfolio-knowledge.js). The browser never receives the Gemini API key.

### Free setup

1. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey) without enabling paid billing.
2. Add these server-only environment variables locally or in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

3. For local API testing, run the project with Vercel’s development server so `/api/chat` is available:

```bash
npm install -g vercel
vercel link
vercel env pull .env.local
vercel dev
```

4. In Vercel, add `GEMINI_API_KEY` and `GEMINI_MODEL` under Project Settings → Environment Variables for the environments you deploy, then redeploy.

The chat route validates input, limits history and request frequency, and uses only the approved knowledge base. Free-tier model availability and rate limits are controlled by Google and can change; no paid service is configured by this project.
