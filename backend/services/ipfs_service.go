package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"log"

	shell "github.com/ipfs/go-ipfs-api"
)

// IPFS Shell (Modify if using a remote IPFS node)
var sh = shell.NewShell("localhost:5001") // or your remote IPFS node

// UploadToIPFS uploads exam data to IPFS
func UploadToIPFS(exam interface{}) (string, error) {
	// Convert exam struct to JSON
	jsonData, err := json.Marshal(exam)
	if err != nil {
		log.Println("❌ Error marshalling JSON:", err)
		return "", err
	}

	// Upload JSON to IPFS
	cid, err := sh.Add(bytes.NewReader(jsonData))
	if err != nil {
		log.Println("❌ Error uploading to IPFS:", err)
		return "", errors.New("failed to upload exam to IPFS")
	}

	return cid, nil
}
