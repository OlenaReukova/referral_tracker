# Referral Tracker

A full-stack application to track the status of healthcare referrals. It consists of a Java Spring Boot backend and a React frontend.

## Overview

Referral Tracker provides a transparent way for patients and providers to follow the progress of a referral from submission to completion. It features a modern, responsive UI and a robust API.

- **Frontend**: React (Vite, TypeScript, Tailwind CSS)
- **Backend**: Spring Boot (Java 21, Gradle)
- **Data Persistence**: JSON-based storage (mock database for development)

## Requirements

Before you begin, ensure you have the following installed:

- **Java 21** (or later)
- **Node.js 20** (or later)
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized execution)

## Setup and Run

### Backend

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```
2. Run the Spring Boot application using Gradle:
   ```powershell
   ./gradlew bootRun
   ```
   The backend will be available at `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure environment variables (optional):
   Copy `.env` to `.env.local` if you need to override the API URL.
4. Run the development server:
   ```powershell
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for the backend API | `http://localhost:8080` |

## Scripts

### Backend (Gradle)

| Command | Description |
| :--- | :--- |
| `./gradlew bootRun` | Runs the Spring Boot application |
| `./gradlew build` | Builds the project and creates an executable JAR |
| `./gradlew test` | Runs the test suite |
| `./gradlew clean` | Cleans the build directory |

### Frontend (npm)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the application for production |
| `npm run lint` | Runs ESLint for code quality checks |
| `npm run preview` | Previews the production build locally |

## Tests

- **Backend**: No tests currently implemented in `src/test`. (TODO: Add unit and integration tests)
- **Frontend**: No test suite configured. (TODO: Add Vitest/Jest and React Testing Library)

## Project Structure

```text
referral_tracker/
├── backend/                # Spring Boot application
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Config and data (referral_data.json)
│   └── build.gradle        # Gradle dependencies
├── frontend/               # React application
│   ├── src/                # UI components and logic
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── Dockerfile              # Docker configuration for backend
```

## License

This project does not have a license file. (TODO: Add a LICENSE file, e.g., MIT)