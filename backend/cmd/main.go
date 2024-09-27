package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Karan-Taneja/AdventForge/internal/router"
	"github.com/joho/godotenv"
)

func main() {
	// Check if running in GitHub Actions
	if os.Getenv("GITHUB_ACTIONS") == "true" {
		log.Println("Running in GitHub Actions, skipping .env file load")
	} else {
		// Load environment variables from .env file
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Fatalf("Error loading .env file")
		}
	}

	// Initialize the router
	r := router.NewRouter()

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Starting server on port %s", port)
	// Start the HTTP server and log any errors that occur, then terminate the program
	log.Fatal(http.ListenAndServe(":"+port, r))
}
