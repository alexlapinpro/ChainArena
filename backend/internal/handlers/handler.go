package handlers

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"

	"GuildVault/internal/db"
	"GuildVault/internal/models"
)

var jwtSecret = []byte("super_secret_key_change_in_production")
var nonces = map[string]string{}

// CORS middleware
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// Middleware to handle CORS preflight
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	}
}

// Auth middleware
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "authorization header required", http.StatusUnauthorized)
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "invalid token claims", http.StatusUnauthorized)
			return
		}

		r.Header.Set("user-address", claims["address"].(string))
		next.ServeHTTP(w, r)
	}
}

// Responses
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

type NonceResponse struct {
	Nonce string `json:"nonce"`
}

type LoginRequest struct {
	Address   string `json:"address"`
	Signature string `json:"signature"`
}

type LoginResponse struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
}

// Auth handlers
func GetNonceHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	addr := r.URL.Query().Get("address")
	if addr == "" {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "missing address"})
		return
	}

	nonce := fmt.Sprintf("Login with wallet %s at %d", addr, time.Now().UnixNano())
	nonces[strings.ToLower(addr)] = nonce

	json.NewEncoder(w).Encode(Response{Success: true, Data: NonceResponse{Nonce: nonce}})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid json"})
		return
	}

	nonce, ok := nonces[strings.ToLower(req.Address)]
	if !ok {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "nonce not found"})
		return
	}

	sig := strings.TrimPrefix(req.Signature, "0x")
	sigBytes, err := hex.DecodeString(sig)
	if err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid signature format"})
		return
	}

	msg := accounts.TextHash([]byte(nonce))
	if sigBytes[64] == 27 || sigBytes[64] == 28 {
		sigBytes[64] -= 27
	}

	pubKey, err := crypto.SigToPub(msg, sigBytes)
	if err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "signature recovery failed"})
		return
	}

	recoveredAddr := crypto.PubkeyToAddress(*pubKey)
	if !strings.EqualFold(recoveredAddr.Hex(), req.Address) {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid signature"})
		return
	}

	// Find or create user
	var user models.User
	if err := db.DB.Where("wallet_addr = ?", req.Address).First(&user).Error; err != nil {
		user = models.User{WalletAddr: req.Address}
		db.DB.Create(&user)
	}

	// Create JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"address": req.Address,
		"user_id": user.ID.String(),
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenStr, err := token.SignedString(jwtSecret)
	if err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "token creation failed"})
		return
	}

	delete(nonces, strings.ToLower(req.Address))

	json.NewEncoder(w).Encode(Response{
		Success: true, 
		Data: LoginResponse{Token: tokenStr, User: user},
	})
}

// Tournament handlers
type CreateTournamentRequest struct {
	Name         string  `json:"name"`
	Game         string  `json:"game"`
	EntryFee     string  `json:"entry_fee"`
	MaxPlayers   int     `json:"max_players"`
	StartDate    string  `json:"start_date"`
	ContractAddr string  `json:"contract_addr"`
}

func CreateTournamentHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var req CreateTournamentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid json"})
		return
	}

	userAddr := r.Header.Get("user-address")
	if userAddr == "" {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "user address required"})
		return
	}

	startDate, err := time.Parse(time.RFC3339, req.StartDate)
	if err != nil {
		startDate = time.Now().Add(24 * time.Hour) // Default to tomorrow
	}

	tournament := models.Tournament{
		Name:           req.Name,
		Game:           req.Game,
		EntryFee:       req.EntryFee,
		MaxPlayers:     req.MaxPlayers,
		CurrentPlayers: 0,
		Status:         "open",
		StartDate:      startDate,
		ContractAddr:   req.ContractAddr,
		CreatorWallet:  userAddr,
	}

	if err := db.DB.Create(&tournament).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to create tournament"})
		return
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: tournament})
}

func GetTournamentsHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var tournaments []models.Tournament
	
	query := db.DB.Preload("Members").Preload("PrizeItems")
	
	// Filter by status if provided
	if status := r.URL.Query().Get("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	
	// Filter by game if provided
	if game := r.URL.Query().Get("game"); game != "" {
		query = query.Where("game = ?", game)
	}

	if err := query.Order("created_at DESC").Find(&tournaments).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to fetch tournaments"})
		return
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: tournaments})
}

func JoinTournamentHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	type JoinRequest struct {
		ContractAddr string `json:"contract_addr"`
	}

	var req JoinRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid json"})
		return
	}

	userAddr := r.Header.Get("user-address")
	
	var tournament models.Tournament
	if err := db.DB.Where("contract_addr = ?", req.ContractAddr).First(&tournament).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "tournament not found"})
		return
	}

	var user models.User
	if err := db.DB.Where("wallet_addr = ?", userAddr).First(&user).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "user not found"})
		return
	}

	// Check if already joined
	var existingMembers []models.User
	db.DB.Model(&tournament).Association("Members").Find(&existingMembers)
	for _, member := range existingMembers {
		if member.WalletAddr == userAddr {
			json.NewEncoder(w).Encode(Response{Success: false, Error: "already joined"})
			return
		}
	}

	if err := db.DB.Model(&tournament).Association("Members").Append(&user); err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to join tournament"})
		return
	}

	// Update current players count
	db.DB.Model(&tournament).Update("current_players", gorm.Expr("current_players + 1"))

	json.NewEncoder(w).Encode(Response{Success: true, Data: map[string]string{"status": "joined successfully"}})
}

// Item handlers
type CreateItemRequest struct {
	Name           string  `json:"name"`
	Game           string  `json:"game"`
	Rarity         string  `json:"rarity"`
	EstimatedValue float64 `json:"estimated_value"`
	ImageURL       string  `json:"image_url"`
}

func CreateItemHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var req CreateItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "invalid json"})
		return
	}

	userAddr := r.Header.Get("user-address")
	var user models.User
	if err := db.DB.Where("wallet_addr = ?", userAddr).First(&user).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "user not found"})
		return
	}

	item := models.Item{
		Name:           req.Name,
		Game:           req.Game,
		Rarity:         req.Rarity,
		EstimatedValue: req.EstimatedValue,
		ImageURL:       req.ImageURL,
		OwnerID:        user.ID,
	}

	if err := db.DB.Create(&item).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to create item"})
		return
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: item})
}

func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var items []models.Item
	
	query := db.DB.Preload("Owner")
	
	// Filter by game if provided
	if game := r.URL.Query().Get("game"); game != "" {
		query = query.Where("game = ?", game)
	}
	
	// Filter by owner if provided  
	if owner := r.URL.Query().Get("owner"); owner != "" {
		query = query.Joins("JOIN users ON users.id = items.owner_id").Where("users.wallet_addr = ?", owner)
	}

	if err := query.Order("created_at DESC").Find(&items).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to fetch items"})
		return
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: items})
}

func GetUserItemsHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	userAddr := r.Header.Get("user-address")
	
	var user models.User
	if err := db.DB.Where("wallet_addr = ?", userAddr).First(&user).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "user not found"})
		return
	}

	var items []models.Item
	if err := db.DB.Where("owner_id = ?", user.ID).Find(&items).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "failed to fetch user items"})
		return
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: items})
}

// User handlers
func GetUserProfileHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	userAddr := r.Header.Get("user-address")
	
	var user models.User
	if err := db.DB.Preload("Items").Preload("Organizations").Where("wallet_addr = ?", userAddr).First(&user).Error; err != nil {
		json.NewEncoder(w).Encode(Response{Success: false, Error: "user not found"})
		return
	}

	// Calculate portfolio value
	var totalValue float64
	for _, item := range user.Items {
		totalValue += item.EstimatedValue
	}

	userProfile := map[string]interface{}{
		"user":            user,
		"portfolio_value": totalValue,
		"item_count":      len(user.Items),
		"tournament_count": len(user.Organizations),
	}

	json.NewEncoder(w).Encode(Response{Success: true, Data: userProfile})
}

// Health check
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	json.NewEncoder(w).Encode(Response{
		Success: true, 
		Data: map[string]string{
			"status": "healthy",
			"time": time.Now().Format(time.RFC3339),
		},
	})
}

// Register all handlers
func RegisterHandlers() {
	// Auth routes
	http.HandleFunc("/auth/nonce", corsMiddleware(GetNonceHandler))
	http.HandleFunc("/auth/login", corsMiddleware(LoginHandler))
	
	// Tournament routes
	http.HandleFunc("/tournaments", corsMiddleware(GetTournamentsHandler))
	http.HandleFunc("/tournament/create", corsMiddleware(authMiddleware(CreateTournamentHandler)))
	http.HandleFunc("/tournament/join", corsMiddleware(authMiddleware(JoinTournamentHandler)))
	
	// Item routes
	http.HandleFunc("/items", corsMiddleware(GetItemsHandler))
	http.HandleFunc("/item/create", corsMiddleware(authMiddleware(CreateItemHandler)))
	http.HandleFunc("/user/items", corsMiddleware(authMiddleware(GetUserItemsHandler)))
	
	// User routes
	http.HandleFunc("/user/profile", corsMiddleware(authMiddleware(GetUserProfileHandler)))
	
	// Health check
	http.HandleFunc("/health", corsMiddleware(HealthHandler))
}
