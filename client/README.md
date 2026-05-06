# Advisr Frontend

This is the React frontend for Advisr, an AI-powered business consultation application. It is built using modern web development practices, focusing on a responsive, user-friendly, and highly interactive interface.

## Tech Stack

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.5 | Core UI library |
| `react-dom` | ^19.2.5 | DOM rendering |
| `react-router-dom` | ^7.15.0 | Client-side routing |
| `zustand` | ^5.0.13 | Global state management |
| `axios` | ^1.16.0 | HTTP client for API calls |
| `react-hook-form` | ^7.75.0 | Form state and validation |
| `@hookform/resolvers` | ^5.2.2 | Zod adapter for react-hook-form |
| `zod` | ^4.4.3 | Schema validation |
| `framer-motion` | ^12.38.0 | Page and component animations |
| `lucide-react` | ^1.14.0 | Icon library |
| `react-hot-toast` | ^2.6.0 | Toast notifications |
| `react-markdown` | ^10.1.0 | Markdown rendering for AI reports |
| `remark-gfm` | ^4.0.1 | GitHub Flavored Markdown (tables, strikethrough) |
| `rehype-raw` | ^7.0.0 | Raw HTML rendering inside markdown |
| `tailwindcss` | ^4.2.4 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.2.4 | Tailwind v4 Vite plugin |
| `@tailwindcss/typography` | ^0.5.19 | Prose styling for AI report content |
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^3.5.0 | Safe Tailwind class merging |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^8.0.10 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.0.1 | React Fast Refresh for Vite |
| `eslint` | ^10.2.1 | Code linting |
| `eslint-plugin-react-hooks` | ^7.1.1 | React Hooks lint rules |
| `eslint-plugin-react-refresh` | ^0.5.2 | React Refresh lint rules |
| `@eslint/js` | ^10.0.1 | ESLint JS config |
| `@types/react` | ^19.2.14 | TypeScript types for React |
| `@types/react-dom` | ^19.2.3 | TypeScript types for ReactDOM |
| `globals` | ^17.5.0 | Global variable definitions for ESLint |

## Project Structure

The client application is organized into a modular structure within the `src/` directory:

```text
src/
├── api/             # Axios API client and endpoint configurations
│   ├── auth.api.js      # Authentication endpoints (login, signup, verify)
│   ├── client.js        # Base Axios instance with credentials support
│   └── consult.api.js   # AI consultation endpoints
├── assets/          # Static media assets (images, SVGs)
├── components/      # Reusable UI components categorized by feature
│   ├── auth/            # Login and Signup forms
│   ├── consult/         # Multi-step consultation wizard components
│   ├── dashboard/       # User dashboard and session cards
│   ├── layout/          # Global layout components (Navbar, PageWrapper)
│   ├── report/          # AI report visualization and fullscreen chat UI
│   └── ui/              # Generic, reusable base components (Button, Input, Select, etc.)
├── pages/           # High-level page components mapped to routes
│   ├── ConsultPage.jsx      # The consultation wizard page
│   ├── DashboardPage.jsx    # User session history dashboard
│   ├── LandingPage.jsx      # Premium root landing page with Framer Motion animations
│   ├── LoginPage.jsx        # User login
│   ├── SessionPage.jsx      # Detailed view of a past consultation report
│   ├── SignupPage.jsx       # User registration
│   └── VerifyEmailPage.jsx  # Email verification handling
├── routes/          # Application routing logic
│   ├── AppRouter.jsx        # Main React Router configuration
│   └── ProtectedRoute.jsx   # Route wrapper to enforce authentication
├── store/           # Zustand global state stores
│   ├── authStore.js         # Authentication state and user profile
│   └── consultStore.js      # Consultation workflow and session state
├── utils/           # Utility functions
│   └── cn.js            # Tailwind class-merging utility (clsx + tailwind-merge)
├── App.jsx          # Root application component
├── index.css        # Global CSS and Tailwind entry point
└── main.jsx         # React DOM rendering entry point
```

## Key Features

- **Premium Landing Page**: A visually stunning, conversion-optimized landing page built with `framer-motion` to immediately convey trust and capability.
- **Multi-Step Consultation Wizard**: Guides users through providing their business profile and problems in a structured, step-by-step UI.
- **Dynamic AI Reports**: Renders complex, AI-generated markdown reports beautifully using `@tailwindcss/typography`.
- **Fullscreen Follow-up Chat**: A React Portal-powered fullscreen chat interface for asking the AI follow-up questions about the generated report, without breaking the underlying layout.
- **Authentication**: JWT-based secure authentication with protected routes.
- **Toast Notifications**: Real-time feedback for user actions.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- The Advisr Backend server running locally on port 5000 (or configured otherwise).

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

By default, the Vite development server will run on `http://localhost:5173`. Make sure your backend `.env` file reflects this URL for CORS policies.
