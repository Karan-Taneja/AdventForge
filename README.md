# AdventForge

## Table of Contents

1. [Introduction](#introduction)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Dockerized Setup (Alternative)](#dockerized-setup-alternative)
5. [License](#license)
6. [Disclaimer](#disclaimer)

## Introduction

**AdventForge** is a work-in-progress project aiming to create a platform similar to D&D Beyond, offering tools and resources for Dungeons & Dragons players and Dungeon Masters.

## Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install Go dependencies:
   ```sh
   go mod download
   ```

3. Set up your database connection:
   - Provide details on how to configure the database connection, such as setting environment variables or updating configuration files.

4. Run the backend server:
   ```sh
   go run main.go
   ```
   - Alternatively, use a tool like [`air`](https://github.com/cosmtrek/air) for hot reloading:
     ```sh
     air
     ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Run the development server:
   ```sh
   pnpm run dev
   ```

## Dockerized Setup (Alternative)

1. From the project root, build and run the containers using Docker Compose:
   ```sh
   docker-compose up --build
   ```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Disclaimer

- This project is a work in progress and may not yet have all the features of a full-fledged D&D Beyond clone.
- The development roadmap and feature set are subject to change.
```