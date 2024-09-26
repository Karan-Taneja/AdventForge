package middleware

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/form3tech-oss/jwt-go"
	"gotest.tools/v3/assert"
)

func setup() {
	os.Setenv("AUTH0_CLIENT_SECRET", "testsecret")
}

func TestNewJWTMiddleware(t *testing.T) {
	setup()

	jwtMiddleware := NewJWTMiddleware()
	assert.Assert(t, jwtMiddleware != nil, "Expected jwtMiddleware to be non-nil")
}

func TestJwtVerify(t *testing.T) {
	setup()

	jwtMiddleware := NewJWTMiddleware()
	handler := JwtVerify(jwtMiddleware)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}))

	t.Run("Valid Token", func(t *testing.T) {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub":   "1234567890",
			"name":  "John Doe",
			"admin": true,
		})
		tokenString, err := token.SignedString([]byte("testsecret"))
		assert.NilError(t, err)

		req, err := http.NewRequest("GET", "/", nil)
		assert.NilError(t, err)
		req.Header.Set("Authorization", "Bearer "+tokenString)

		rr := httptest.NewRecorder()
		handler.ServeHTTP(rr, req)

		assert.Equal(t, rr.Code, http.StatusOK, "handler returned wrong status code")
		assert.Equal(t, rr.Body.String(), "OK", "handler returned unexpected body")
	})

	t.Run("Invalid Token", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/", nil)
		assert.NilError(t, err)
		req.Header.Set("Authorization", "Bearer invalidtoken")

		rr := httptest.NewRecorder()
		handler.ServeHTTP(rr, req)

		assert.Equal(t, rr.Code, http.StatusUnauthorized, "handler returned wrong status code")
		expectedBody := "token contains an invalid number of segments\nForbidden"
		actualBody := strings.TrimSpace(rr.Body.String())
		assert.Equal(t, actualBody, expectedBody, "handler returned unexpected body")
	})
}
