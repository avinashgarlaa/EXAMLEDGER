package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/avinashgarlaa/blockchain-exam-backend/config"
	"github.com/avinashgarlaa/blockchain-exam-backend/routes"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	// Test print to verify keys are loaded
	fmt.Println("🔑 PINATA_API_KEY:", os.Getenv("PINATA_API_KEY"))
	fmt.Println("🔐 PINATA_SECRET_API_KEY:", os.Getenv("PINATA_SECRET_API_KEY"))

	// Connect to QuickNode Ethereum
	client := config.ConnectQuickNode()
	defer client.Close()

	fmt.Println("✅ Connected to QuickNode")

	// Setup Routes
	routes.SetupExamRoutes()

	// Start HTTP server
	port := ":8080"
	fmt.Println("🚀 Server is running on http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
