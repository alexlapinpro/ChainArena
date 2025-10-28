package main

import (
	"log"
	"net/http"
	"os"

	"GuildVault/internal/db"
	"GuildVault/internal/handlers"
	"GuildVault/internal/services"
)

func main() {
	// Initialize database
	db.InitDB()
	
	// Deploy smart contracts if needed
	if os.Getenv("DEPLOY_CONTRACTS") == "true" {
		log.Println("Deploying smart contracts...")
		services.TournamentDeploy("smartcontracts/TournamentInstance.json")
		services.TournamentDeploy("smartcontracts/TournamentFactory.json")
		services.TournamentDeploy("smartcontracts/ItemVault.json")
		services.TournamentDeploy("smartcontracts/WrappedItemToken.json")
		services.TournamentDeploy("smartcontracts/InventoryManager.json")
	}

	// Register all API handlers
	handlers.RegisterHandlers()

	// Get port from environment or default to 5050
	port := os.Getenv("PORT")
	if port == "" {
		port = "5050"
	}

	log.Printf("🚀 Chain Arena API Server starting on port %s", port)
	log.Printf("🔗 Health check: http://localhost:%s/health", port)
	
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}
