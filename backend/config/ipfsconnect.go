package config

import (
	"fmt"
	"log"

	shell "github.com/ipfs/go-ipfs-api"
)

// ConnectIPFS initializes a connection to the local IPFS node
func ConnectIPFS() *shell.Shell {
	ipfsURL := "http://127.0.0.1:5001" // Local IPFS API
	sh := shell.NewShell(ipfsURL)

	// Check connection
	_, err := sh.ID()
	if err != nil {
		log.Fatalf("❌ Failed to connect to IPFS: %v", err)
	}

	fmt.Println("✅ Successfully connected to IPFS")
	return sh
}
