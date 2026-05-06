# Zuvio Frontend

This is the React frontend for Zuvio, an AI-powered business consultation application. It is built using modern web development practices, focusing on a responsive, user-friendly, and highly interactive interface.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with `@tailwindcss/typography` for markdown styling)
- **Animations**: `framer-motion` for fluid page transitions and micro-interactions
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Markdown Rendering**: `react-markdown` with `remark-gfm` (for GitHub Flavored Markdown support)
- **Notifications**: React Hot Toast

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
- The Zuvio Backend server running locally on port 5000 (or configured otherwise).

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
