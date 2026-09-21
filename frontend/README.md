# Frontend (Next.js + React 19)

This is the frontend client for the application, built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/) & Base UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [ESLint](https://eslint.org/) (`eslint-config-next`)

## 🚀 Getting Started

First, ensure dependencies are installed:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server on port 3000 with HMR.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server after building.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.

## 📁 Directory Structure

```text
frontend/
├── app/                  # Next.js App Router pages, styles, and layouts
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Main entry route
│   ├── globals.css       # Tailwind CSS styles and theme definitions
│   └── homepage/         # Homepage route
├── components/           # UI components (shadcn/ui & custom primitives)
│   └── ui/               # Reusable shadcn/ui components (e.g. Button)
├── lib/                  # Shared helper functions (e.g. cn class merging)
├── public/               # Static assets (images, icons, SVGs)
├── components.json       # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json          # Frontend manifest and scripts
```

