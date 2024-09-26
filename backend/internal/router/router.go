package router

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"

	internal_middleware "github.com/Karan-Taneja/AdventForge/internal/middleware"
)

type Router struct {
	*chi.Mux
}

func NewRouter() *Router {
	if err := godotenv.Load("../../../.env"); err != nil {
		log.Fatalf("Error loading the .env file: %v", err)
	}
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Heartbeat("/ping"))

	jwtMiddleware := internal_middleware.NewJWTMiddleware()

	r.Get("/login", LoginHandler)
	r.Get("/callback", CallbackHandler)
	r.With(internal_middleware.JwtVerify(jwtMiddleware)).Get("/protected", ProtectedHandler)

	return &Router{Mux: r}
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	auth0Domain := os.Getenv("AUTH0_DOMAIN")
	clientID := os.Getenv("AUTH0_CLIENT_ID")
	redirectURI := os.Getenv("AUTH0_REDIRECT_URI")

	authURL := "https://" + auth0Domain + "/authorize?response_type=code&client_id=" + clientID + "&redirect_uri=" + redirectURI + "&scope=openid%20profile%20email&connection=google-oauth2"

	http.Redirect(w, r, authURL, http.StatusTemporaryRedirect)
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	auth0Domain := os.Getenv("AUTH0_DOMAIN")
	clientID := os.Getenv("AUTH0_CLIENT_ID")
	returnTo := os.Getenv("AUTH0_LOGOUT_REDIRECT_URI")

	logoutURL := "https://" + auth0Domain + "/v2/logout?client_id=" + clientID + "&returnTo=" + returnTo

	http.Redirect(w, r, logoutURL, http.StatusTemporaryRedirect)
}

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	auth0Domain := os.Getenv("AUTH0_DOMAIN")
	clientID := os.Getenv("AUTH0_CLIENT_ID")
	clientSecret := os.Getenv("AUTH0_CLIENT_SECRET")
	redirectURI := "http://localhost:8080/callback"

	conf := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURI,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://" + auth0Domain + "/authorize",
			TokenURL: "https://" + auth0Domain + "/oauth/token",
		},
	}

	code := r.URL.Query().Get("code")
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
		return
	}

	// Use the token to get user info from Auth0
	client := conf.Client(context.Background(), token)
	resp, err := client.Get("https://" + auth0Domain + "/userinfo")
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	profile := make(map[string]interface{})
	if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		http.Error(w, "Failed to decode user info", http.StatusInternalServerError)
		return
	}

	// Handle the user profile, e.g., create a session, store user info, etc.
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is a protected endpoint"))
}
