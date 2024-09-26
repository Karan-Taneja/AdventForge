package router

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func setup() {
	os.Setenv("AUTH0_DOMAIN", "dev-pblx01d706b7c7l4.us.auth0.com")
	os.Setenv("AUTH0_CLIENT_ID", "your-auth0-client-id")
	os.Setenv("AUTH0_CLIENT_SECRET", "your-auth0-client-secret")
	os.Setenv("AUTH0_REDIRECT_URI", "http://localhost:8080/callback")
	os.Setenv("AUTH0_LOGOUT_REDIRECT_URI", "http://localhost:8080")
}

func TestLoginHandler(t *testing.T) {
	setup()

	req, err := http.NewRequest("GET", "/login", nil)
	assert.NilError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(LoginHandler)

	handler.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusTemporaryRedirect, "handler returned wrong status code")

	location := rr.Header().Get("Location")
	assert.Assert(t, strings.Contains(location, "https://"), "handler returned wrong redirect location: got %v", location)
}

func TestCallbackHandler(t *testing.T) {
	setup()

	req, err := http.NewRequest("GET", "/callback?code=testcode", nil)
	assert.NilError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CallbackHandler)

	handler.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusInternalServerError, "handler returned wrong status code")

	expected := "Failed to exchange token"
	actual := strings.TrimSpace(rr.Body.String())
	assert.Equal(t, actual, expected, "handler returned unexpected body")
}

func TestProtectedHandler(t *testing.T) {
	setup()

	req, err := http.NewRequest("GET", "/protected", nil)
	assert.NilError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(ProtectedHandler)

	handler.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusOK, "handler returned wrong status code")

	expected := "This is a protected endpoint"
	assert.Equal(t, rr.Body.String(), expected, "handler returned unexpected body")
}

func TestLogoutHandler(t *testing.T) {
	setup()

	req, err := http.NewRequest("GET", "/logout", nil)
	assert.NilError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(LogoutHandler)

	handler.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusTemporaryRedirect, "handler returned wrong status code")

	location := rr.Header().Get("Location")
	assert.Assert(t, strings.Contains(location, "https://"), "handler returned wrong redirect location: got %v", location)
}
