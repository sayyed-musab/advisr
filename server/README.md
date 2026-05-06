# Advisr Backend

This is the Express.js backend for Advisr, providing authentication, email verification, and AI-powered business consultation using NVIDIA's API.

## Tech Stack

- **Framework**: Express.js (Node.js)
- **Language**: JavaScript (ES Modules)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies
- **Password Hashing**: bcryptjs
- **Email Delivery**: Nodemailer
- **Validation**: Zod
- **AI Integration**: NVIDIA NIM API (using `nvidia/nemotron-3-nano-30b-a3b`)
- **Dev Tools**: nodemon

## Getting Started

### Prerequisites

- Node.js (v20.6.0+)
- MongoDB instance (local or MongoDB Atlas)
- SMTP account for email delivery
- NVIDIA API Key

### Installation

1. Clone the repository and navigate to the server directory:
   ```bash
   cd server
   npm install
   ```

2. Setup Environment Variables:
   Copy the `.env.example` file to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```

   **Required Variables:**
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for signing JWTs
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Your email credentials
   - `CLIENT_URL`: URL of the frontend (e.g., http://localhost:5173)
   - `NVIDIA_API_KEY`: Your API key for NVIDIA NIM

3. Start the Development Server:
   ```bash
   npm run dev
   ```

## API Documentation

The API uses standard HTTP response codes and a consistent JSON response format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... } 
}
```

### Authentication (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/auth/signup` | No | Register a new user and trigger verification email. |
| `GET`  | `/api/auth/verify-email?token=` | No | Verify a user's email via the token sent to them. |
| `POST` | `/api/auth/login` | No | Login and set an `httpOnly` authentication cookie. |
| `POST` | `/api/auth/logout` | Yes | Clear the authentication cookie. |
| `GET`  | `/api/auth/me` | Yes | Get the profile of the currently logged-in user. |

### Consult (`/api/consult`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/consult/analyze` | Yes | Submit a business form, receive an AI analysis report, and save the session. |
| `POST` | `/api/consult/followup/:sessionId`| Yes | Ask a follow-up question on an existing consultation session. |
| `GET`  | `/api/consult/sessions` | Yes | Get a list of all consultation sessions for the logged-in user. |
| `GET`  | `/api/consult/sessions/:id` | Yes | Get full details, including report and follow-ups, for a specific session. |
| `DELETE`| `/api/consult/sessions/:id` | Yes | Delete a specific consultation session. |

## Project Structure

```
server/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers mapping requests to services
│   ├── middlewares/     # Auth, validation, and error middlewares
│   ├── models/          # Mongoose DB schemas
│   ├── routes/          # Express route definitions
│   ├── services/        # Core business logic (auth, mail, nvidia)
│   ├── validators/      # Zod validation schemas
│   ├── utils/           # Utility functions (response formatting)
│   └── app.js           # Main Express application entry point
├── .env                 # Environment variables (ignored in git)
├── .env.example         # Example environment template
└── package.json         # Project dependencies and scripts
```
