package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/avinashgarlaa/blockchain-exam-backend/config"
	"github.com/avinashgarlaa/blockchain-exam-backend/routes"
)

func main() {
	// Connect to QuickNode Ethereum
	client := config.ConnectQuickNode()
	defer client.Close()

	fmt.Println("✅ Connected to QuickNode")

	// Connect to IPFS
	ipfsClient := config.ConnectIPFS()
	if ipfsClient == nil {
		log.Fatal("❌ Failed to connect to IPFS")
		return
	}
	fmt.Println("✅ Connected to IPFS")

	// Setup Routes
	routes.SetupExamRoutes()

	// Start HTTP server
	port := ":8080"
	fmt.Println("🚀 Server is running on http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
