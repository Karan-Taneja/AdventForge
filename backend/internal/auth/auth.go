package auth

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
)

func IsAuthenticated(r *http.Request) bool {
		// Get the Authorization header
		authHeader := r.Header.Get("Authorization")

		// Check if the header is present and starts with "Bearer "
		if !strings.HasPrefix(authHeader, "Bearer ") {
			return false
		}
	
		// Extract the token
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	
		// Verify the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("your-secret-key"), nil
		})
	
		if err != nil || !token.Valid {
			return false
		}
	
		return true
}