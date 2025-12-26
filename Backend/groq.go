// groq.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Groq API response (non-streaming)
type groqResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

// callGroq is responsible ONLY for talking to Groq and returning the reply text.
func callGroq(apiKey, userMsg string) (string, error) {
	// Basic single-turn chat: system → user
	body := map[string]any{
		"model": "llama-3.1-8b-instant",
		"messages": []map[string]string{
			{"role": "system", "content": "You are Mitzy, a character in a game. Be flirty, overconfident, and funny. Limit your responses to 30 words. Write your response in a clean, natural conversational tone. Do NOT use emojis. Do NOT include roleplay actions e.g., *giggles*, *smirks*, *laughs*, *winks*, *blushes*. Do NOT include asterisks or stage directions. Do NOT use overly dramatic, cutesy, or exaggerated expressions. Stay concise, direct, and human. Give only the actual verbal content of the reply."},
			{"role": "user", "content": userMsg},
		},
		"temperature": 1.0,
		"top_p":       1.0,
		"stream":      false, // simpler for HTTP API
	}

	payload, err := json.Marshal(body)
	if err != nil {
		return "", fmt.Errorf("marshal body: %w", err)
	}

	req, err := http.NewRequest(
		http.MethodPost,
		"https://api.groq.com/openai/v1/chat/completions",
		bytes.NewReader(payload),
	)
	if err != nil {
		return "", fmt.Errorf("new request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("request error: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		b, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("bad status %d: %s", resp.StatusCode, string(b))
	}

	var groqResp groqResponse
	if err := json.NewDecoder(resp.Body).Decode(&groqResp); err != nil {
		return "", fmt.Errorf("decode response: %w", err)
	}

	if len(groqResp.Choices) == 0 {
		return "", fmt.Errorf("no choices in response")
	}

	return groqResp.Choices[0].Message.Content, nil
}
