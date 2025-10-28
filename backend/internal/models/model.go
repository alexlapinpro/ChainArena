package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID            uuid.UUID    `gorm:"type:uuid;primaryKey" json:"id"`
	WalletAddr    string       `gorm:"uniqueIndex;not null" json:"wallet_addr"`
	CreatedAt     time.Time    `json:"created_at"`
	UpdatedAt     time.Time    `json:"updated_at"`
	Organizations []Tournament `gorm:"many2many:user_organizations;" json:"organizations,omitempty"`
	Items         []Item       `gorm:"foreignKey:OwnerID" json:"items,omitempty"`
}

type Tournament struct {
	ID            uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Name          string    `gorm:"not null" json:"name"`
	Game          string    `gorm:"not null" json:"game"`
	ContractAddr  string    `gorm:"uniqueIndex;not null" json:"contract_addr"`
	CreatorWallet string    `gorm:"not null" json:"creator_wallet"`
	EntryFee      string    `json:"entry_fee"` // ETH amount as string
	PrizePool     string    `json:"prize_pool"` // ETH amount as string
	MaxPlayers    int       `json:"max_players"`
	CurrentPlayers int      `json:"current_players"`
	Status        string    `gorm:"default:'open'" json:"status"` // open, active, completed
	StartDate     time.Time `json:"start_date"`
	EndDate       *time.Time `json:"end_date,omitempty"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Members       []User    `gorm:"many2many:user_organizations;" json:"members,omitempty"`
	PrizeItems    []Item    `gorm:"many2many:tournament_prize_items;" json:"prize_items,omitempty"`
}

type Item struct {
	ID            uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	Name          string     `gorm:"not null" json:"name"`
	Game          string     `gorm:"not null" json:"game"`
	Rarity        string     `json:"rarity"`
	EstimatedValue float64   `json:"estimated_value"`
	ImageURL      string     `json:"image_url"`
	TokenAddress  *string    `json:"token_address,omitempty"` // Smart contract address if tokenized
	TokenID       *string    `json:"token_id,omitempty"` // Token ID if ERC721/1155
	OwnerID       uuid.UUID  `json:"owner_id"`
	Owner         User       `gorm:"foreignKey:OwnerID" json:"owner,omitempty"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}

func (t *Tournament) BeforeCreate(tx *gorm.DB) (err error) {
	if t.ID == uuid.Nil {
		t.ID = uuid.New()
	}
	return
}

func (i *Item) BeforeCreate(tx *gorm.DB) (err error) {
	if i.ID == uuid.Nil {
		i.ID = uuid.New()
	}
	return
}
