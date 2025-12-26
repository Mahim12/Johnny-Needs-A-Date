// handler.go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

// Incoming request from the frontend
type ChatRequest struct {
	Message string `json:"message"`
}

// Outgoing response to the frontend
type ChatResponse struct {
	Reply     string `json:"reply"`
	Sentiment string `json:"sentiment"`
}

// newChatHandler connects HTTP world → Groq world by calling callGroq().
func newChatHandler(apiKey string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// CORS for your decoupled frontend
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == http.MethodOptions {
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var reqBody ChatRequest
		if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// --- word-count guard---
		crispResponse := []string{
			"You talk too much, little boy!",
			"I like flirty folks, not talkative little children.",
			"Keep it short and sweet, kiddo!",
			"I'm bored! Do you like my hair?",
		}

		trimmed := strings.TrimSpace(reqBody.Message)
		fmt.Println("User message:", trimmed)
		wordCount := 0
		if trimmed != "" {
			wordCount = len(strings.Fields(trimmed))
		}
		if wordCount > 20 {
			fmt.Println("Message too long:", wordCount, "words")

			// pick a random example
			rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
			choice := crispResponse[rnd.Intn(len(crispResponse))]

			json.NewEncoder(w).Encode(ChatResponse{
				Reply: choice,
			})
			return
		}
		// --- end guard ---

		reply, err := callGroq(apiKey, reqBody.Message)
		if err != nil {
			log.Println("groq error:", err)
			http.Error(w, "AI error", http.StatusInternalServerError)
			return
		}

		// Try to parse reply as JSON with sentiment
		var aiResp ChatResponse
		if err := json.Unmarshal([]byte(reply), &aiResp); err != nil {
			// fallback: if not JSON, treat whole reply as text
			aiResp.Reply = reply
			aiResp.Sentiment = "neutral"
		}
		fmt.Println("AI reply:", aiResp.Reply, "Sentiment:", aiResp.Sentiment)

		// Send response back to frontend
		json.NewEncoder(w).Encode(aiResp)
	}
}
