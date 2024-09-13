# AdventForge

**AdventForge** is a work-in-progress project aiming to create a platform similar to D&D Beyond, offering tools and resources for Dungeons & Dragons players and Dungeon Masters.

## Features (Planned or In-Progress)

* **User Authentication & Profiles:** Secure user accounts with Google authentication, enabling personalized experiences and data management.
* **Character Creation & Management:** Create, customize, and manage D&D characters, including stats, abilities, equipment, and spells. 

## Technologies Used

* **Backend:** Go, Jet, Graphjin
* **Frontend:** Nuxt 3, Vite, Vue
* **Database:** Postgres

## Getting Started (Development Setup)

**Prerequisites:**

* **Go:** Install Go 1.21 or later 
* **Node.js & pnpm:** Install Node.js and pnpm
* **Docker & Docker Compose:** Install Docker and Docker Compose for containerized development
* **Database:** Setup PostgreSQL

**Steps:**

1. **Clone the repository:** 
   ```bash
   git clone [https://github.com/Karan-Taneja/AdventForge.git](https://github.com/Karan-Taneja/AdventForge.git)
   cd AdventForge
   ```

2. **Backend Setup:**
   * Navigate to the `backend` directory.
   * Install Go dependencies: `go mod download`
   * Set up your database connection (refer to the backend code for specific configuration)
   * Run the backend server: `go run main.go` (or use a tool like `air` for hot reloading)

3. **Frontend Setup:**
   * Navigate to the `frontend` directory
   * Install dependencies: `pnpm install`
   * Run the development server: `pnpm run dev`

4. **Dockerized Setup (Alternative)**
    * From the project root, build and run the containers using Docker Compose:
      ```bash
      docker-compose up --build
      ```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

**Disclaimer**

* This project is a work in progress and may not yet have all the features of a full-fledged D&D Beyond clone. 
* The development roadmap and feature set are subject to change. 