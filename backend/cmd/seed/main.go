package main

import (
	"log"
	"GuildVault/internal/db"
	"GuildVault/internal/models"
)

func main() {
	// Initialize database
	db.InitDB()

	// Create sample gaming items for demonstration
	sampleItems := []models.Item{
		// CS:GO Items
		{
			Name:           "AK-47 | Redline",
			Game:           "CS:GO",
			Rarity:         "Classified",
			EstimatedValue: 45.50,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmkjVWx-ERpZjuhJYPBcAE6YV2D_FK5wru7hcO86M7A1zI37nNz4C3bng",
		},
		{
			Name:           "AWP | Dragon Lore",
			Game:           "CS:GO", 
			Rarity:         "Covert",
			EstimatedValue: 4500.00,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2m8FuZJw3b2Vo9rxjgG28xZtNzz1JNSScgM6ZV_T-VS-kr--jMO5vczXiSw0kIKBUec",
		},
		{
			Name:           "Karambit | Doppler",
			Game:           "CS:GO",
			Rarity:         "Covert",
			EstimatedValue: 650.00,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Imsj7NqnQmGxU6sN_ntnTuNSh2gSy_xdlMjihLdXEJgRqYQ7UqwO2xLq-h8C-78-cyCM1vyEhsCzUmh6xhBweP_sv26JQUc7Wnw",
		},
		
		// Dota 2 Items
		{
			Name:           "Immortal Treasure III 2023",
			Game:           "Dota 2",
			Rarity:         "Immortal",
			EstimatedValue: 15.30,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh41hpUX8D3MbKzQ",
		},
		{
			Name:           "Arcana - Techies Swine of the Sunken Galley",
			Game:           "Dota 2",
			Rarity:         "Arcana", 
			EstimatedValue: 34.99,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh41hpUWOBmQdJjE",
		},
		{
			Name:           "Pudge Immortal Hook",
			Game:           "Dota 2",
			Rarity:         "Immortal",
			EstimatedValue: 250.00,
			ImageURL:       "https://community.akamai.steamstatic.com/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh41hpUXIDzAfJGY",
		},
		
		// Valorant Items (conceptual since Valorant doesn't have tradeable items)
		{
			Name:           "Vandal | Prime", 
			Game:           "Valorant",
			Rarity:         "Premium",
			EstimatedValue: 17.99,
			ImageURL:       "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5f5bbb5dbfab4ec1/62b4c9a7ff5b5d11db2e8b6c/VALORANT_EP5_BATTLEPASS_TIERS_02.png",
		},
		{
			Name:           "Phantom | Ion",
			Game:           "Valorant", 
			Rarity:         "Premium",
			EstimatedValue: 17.99,
			ImageURL:       "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt36ca0df9c9b1c3a7/60d88d10c2a4644a5c6f4ea2/VALORANT_SKINS_COLLECTIONS_ION.png",
		},
		
		// League of Legends Items
		{
			Name:           "K/DA Ahri Prestige Edition",
			Game:           "League of Legends",
			Rarity:         "Prestige",
			EstimatedValue: 100.00,
			ImageURL:       "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
		},
		{
			Name:           "True Damage Ekko",
			Game:           "League of Legends",
			Rarity:         "Legendary", 
			EstimatedValue: 18.20,
			ImageURL:       "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_0.jpg",
		},
		
		// Minecraft Items
		{
			Name:           "Minecon 2023 Cape",
			Game:           "Minecraft",
			Rarity:         "Exclusive",
			EstimatedValue: 500.00,
			ImageURL:       "https://minecraft.net/content/dam/games/minecraft/screenshots/minecon-cape.png",
		},
		{
			Name:           "Founder's Cape",
			Game:           "Minecraft",
			Rarity:         "Exclusive",
			EstimatedValue: 1000.00,
			ImageURL:       "https://minecraft.net/content/dam/games/minecraft/screenshots/founders-cape.png",
		},
		
		// Rocket League Items
		{
			Name:           "Octane | Titanium White",
			Game:           "Rocket League",
			Rarity:         "Import",
			EstimatedValue: 450.00,
			ImageURL:       "https://rl.insider.gg/assets/img/items/body/octane_tw.png",
		},
		{
			Name:           "Black Market Chameleon",
			Game:           "Rocket League",
			Rarity:         "Black Market",
			EstimatedValue: 850.00,
			ImageURL:       "https://rl.insider.gg/assets/img/items/decal/chameleon.png",
		},
	}

	// Create a demo user if not exists
	demoWallet := "0x742d35Cc6634C0532925a3b8D2B9a0A15C6E5777" // Demo wallet address
	var demoUser models.User
	if err := db.DB.Where("wallet_addr = ?", demoWallet).First(&demoUser).Error; err != nil {
		demoUser = models.User{WalletAddr: demoWallet}
		if err := db.DB.Create(&demoUser).Error; err != nil {
			log.Fatalf("Failed to create demo user: %v", err)
		}
	}

	// Add items to demo user
	for i, item := range sampleItems {
		item.OwnerID = demoUser.ID
		if err := db.DB.Create(&item).Error; err != nil {
			log.Printf("Failed to create item %d: %v", i+1, err)
		} else {
			log.Printf("✅ Created item: %s (%s) - $%.2f", item.Name, item.Game, item.EstimatedValue)
		}
	}

	log.Printf("🎮 Successfully seeded %d gaming items to the database!", len(sampleItems))
	log.Printf("🔗 Demo wallet: %s", demoWallet)
	log.Printf("💡 These items will be visible in the Browse Items page")
}
