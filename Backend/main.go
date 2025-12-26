// main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		log.Fatal("GROQ_API_KEY not set in environment")
	}

	// Combine: HTTP handler that uses the Groq client
	http.HandleFunc("/chat", newChatHandler(apiKey))

	fmt.Println("✅ Go API running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
