package handlers

import (
	"net/http"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
    // Replace with your own client ID and secret
    config := &oauth2.Config{
        ClientID:     "YOUR_CLIENT_ID",
        ClientSecret: "YOUR_CLIENT_SECRET",
        RedirectURL:  "YOUR_REDIRECT_URL",
        Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
        Endpoint:     google.Endpoint,
    }

    state := "some_state"
    authURL := config.AuthCodeURL(state)

    http.Redirect(w, r, authURL, http.StatusTemporaryRedirect)
}