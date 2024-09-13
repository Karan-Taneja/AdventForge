package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func googleAuthMain() {
	config := &oauth2.Config{
		ClientID:     os.Getenv(("GOOGLE_CLIENT_ID")),
		ClientSecret: os.Getenv(("GOOGLE_CLIENT_SECRET")),
		RedirectURL:  os.Getenv(("GOOGLE_REDIRECT_URL")),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

    http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
        url := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
        http.Redirect(w, r, url, http.StatusTemporaryRedirect)
    })

    http.HandleFunc("/callback", func(w http.ResponseWriter, r *http.Request) {
        code := r.URL.Query().Get("code")
        token, err := config.Exchange(context.Background(), code)
        if err != nil {
            log.Printf("Code exchange failed: %s", err)
            return
        }

        // Use the token to access Google APIs or store it for later use
        fmt.Fprintf(w, "Access Token: %s\n", token.AccessToken)
    })

    log.Fatal(http.ListenAndServe(":8080", nil))
}