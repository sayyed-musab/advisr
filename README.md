# Advisr - AI Business Consultant for Small Indian Businesses

Advisr is an intelligent web application designed specifically to act as an AI Business Consultant for small shop owners and businesses in India. 

By simply typing out their current business profile and the specific problems they are facing, business owners receive a comprehensive, structured response. Advisr leverages the long-context reasoning strengths of NVIDIA's Nemotron models to think deeply through the problem, providing a tailored **Diagnosis**, an actionable **Action Plan**, and immediate **Priority Steps**.

## Demo

![Advisr - Full Working Demo](./working.gif)

## How It Works

1. **Intake**: A business owner provides their business type, current challenges, and specific details.
2. **Reasoning**: The backend constructs a highly-tuned prompt and feeds it to the `nvidia/nemotron-3-nano-30b-a3b` model via the NVIDIA NIM API.
3. **Delivery**: The AI returns a beautifully formatted, Markdown-powered report detailing exact strategies tailored to the Indian small business ecosystem.
4. **Follow-up**: Users can engage in a full-screen, interactive chat with the AI to ask follow-up questions and drill down into specific strategies.

## Project Architecture

Advisr is built as a modern full-stack web application using the MERN stack (MongoDB, Express, React, Node.js). 

The repository is split into two main workspaces:

- [**Frontend (Client)**](./client/README.md): A React 18 application built with Vite, Tailwind CSS, Zustand, and `react-markdown` for rich UI rendering.
- [**Backend (Server)**](./server/README.md): A Node.js/Express REST API that handles JWT authentication, MongoDB data persistence, and secure communication with the NVIDIA NIM API.

## Getting Started

To get the project running locally, you will need to set up both the backend and frontend separately. 

Please refer to the dedicated documentation in each workspace for detailed setup instructions, environment variable configurations, and scripts:

👉 **[View Backend Setup Instructions](./server/README.md)**  
👉 **[View Frontend Setup Instructions](./client/README.md)**
