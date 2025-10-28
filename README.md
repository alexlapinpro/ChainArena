# ChainArena 🎮⛓️

> **Decentralized In-Game Item Management Platform** | Built for ETH Bishkek Hackathon powered by Xsolla Backpack

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://chainarena.online)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![zkSync Era](https://img.shields.io/badge/zkSync-Era-8A2BE2)]()

## 🌟 Overview

ChainArena is a comprehensive decentralized platform that revolutionizes in-game item management by giving players true ownership of their digital assets. Built on **Xsolla ZK** (a gaming-optimized Layer 2 on zkSync), the platform enables seamless management, trading, and valuation of items from popular games like CS:GO, DOTA 2, Valorant, and more.

**Live Platform:** [chainarena.online](https://chainarena.online)

### 🎯 Core Features

- **🎒 Xsolla Backpack Integration** - Your digital inventory with true ownership via NFTs (ERC-721/ERC-1155)
- **🤖 AI-Powered Valuation** - Real-time item pricing using market data from Loot.farm
- **💱 P2P Trading Marketplace** - Decentralized item trading with 2.5% platform fee
- **🏆 Optional Tournaments** - Skill-based competitions to earn and upgrade items
- **⚡ Gasless Transactions** - zkSync Native Account Abstraction for free user interactions
- **💳 Fiat Integration** - Credit card on/off-ramps via Xsolla API
- **🔍 Full Transparency** - All transactions visible on Xsolla ZK Block Explorer

## 🚀 How It Works

### 1. Onboarding
- Connect your EVM-compatible wallet (MetaMask, etc.)
- Access your Xsolla Backpack with on-chain item synchronization
- No crypto knowledge required - fiat on-ramps available

### 2. Item Management
- View inventory as interactive grid with game-specific filters
- AI evaluation for instant market pricing
- Merge/evolve items to create rarer assets
- Track on-chain provenance via zkSync Explorer

### 3. Earning Items
- Daily quests and community challenges
- Airdrops and rewards
- Optional tournaments with item entry fees
- Instant payouts to winners (2-3 seconds, ~$0.01-0.05 fees)

### 4. Trading & Withdrawing
- List items on decentralized marketplace
- AI-suggested pricing for optimal sales
- P2P auction system with real-time bidding
- Withdraw to fiat (USDC/USD) via Xsolla

## 🛠️ Technical Stack

### Smart Contracts (zkSync Era/Xsolla ZK)
```
- ItemNFT.sol - Minting and evolving items
- TournamentFactory.sol - Tournament creation and management
- PrizeVault.sol - Trustless item pool locking
- DisputeManager.sol - Community-driven dispute resolution
- Marketplace.sol - P2P trading logic
```
**Deployed on:** Sepolia Testnet  
**Features:** Native Account Abstraction, OpenZeppelin security standards

### Backend (Python FastAPI)
```python
- FastAPI framework for high-performance async APIs
- web3.py/zksync-ethers for blockchain interaction
- PostgreSQL for data persistence
- Redis for caching and real-time PubSub
- ML/AI for item valuation (Torch embeddings)
```

**Key API Endpoints:**
- `/api/items/evaluate` - AI-powered item valuation
- `/api/backpack/inventory` - Fetch user items
- `/api/tournaments/create` - Tournament setup
- `/api/marketplace/list` - Item listing

### Frontend (Next.js 14)
```typescript
- React with TypeScript
- Wagmi for zkSync wallet integration
- Xsolla UI-Kit (Board, RichIcon, Tabs)
- Framer Motion for animations
- Real-time updates via WebSocket/Redis
```

**Pages:**
- Home - Hero with live stats and 3D arena
- Inventory - Grid view of owned items
- Earn - Quests, tournaments, challenges
- Trade & Sell - P2P marketplace
- Profile - Transaction history

### Database Schema
```sql
-- Items table
items (id, metadata, owner, rarity, game_type, on_chain_address)

-- Tournaments table
tournaments (id, name, entry_fee, prize_pool, status, created_at)

-- Transactions table
transactions (id, user, type, item_id, amount, timestamp)
```

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- Redis 6+
- MetaMask or EVM wallet

### Clone Repository
```bash
git clone https://github.com/alexlapinpro/ChainArena.git
cd ChainArena
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your keys (Xsolla API, zkSync RPC, PostgreSQL, Redis)

# Run migrations
python manage.py migrate

# Start server
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local
# Add your API URL and wallet connect keys

# Start development server
npm run dev
```

### Smart Contract Deployment
```bash
cd contracts
npm install

# Deploy to zkSync Sepolia
npx hardhat deploy --network zksync-sepolia

# Verify contracts
npx hardhat verify --network zksync-sepolia 
```

## 🎮 Supported Games

- **CS:GO** - Skins, weapons, cases
- **DOTA 2** - Items, couriers, sets
- **Valorant** - Skins, gun buddies
- **League of Legends** - Skins, chromas
- **And more...**

## 🔐 Security Features

- ✅ OpenZeppelin audited contracts
- ✅ Trustless prize locking via smart contracts
- ✅ Community-driven dispute resolution
- ✅ Non-custodial wallet integration
- ✅ On-chain transaction verification

## 💡 Key Innovations

1. **AI-Enhanced Economies** - Machine learning for item valuation and merge recommendations
2. **Cross-Game Compatibility** - Items transferable across gaming ecosystems
3. **Gasless UX** - Zero transaction fees for new users via zkSync Paymaster
4. **Instant Settlements** - Tournament payouts in under 60 seconds
5. **Fiat Integration** - Seamless onboarding for non-crypto users

## 📊 Platform Benefits

| Feature | ChainArena | Traditional Platforms |
|---------|------------|----------------------|
| Platform Fee | 2.5% | 10-15% |
| Payout Speed | <60 seconds | 3-7 days |
| Item Ownership | True (NFT) | Platform-controlled |
| Transparency | Full on-chain | Opaque |
| Entry Barriers | None (fiat support) | Crypto required |

## How it works?

**Inventory AI evaluation**
<img width="1851" height="894" alt="telegram-cloud-document-2-5470044724410748312" src="https://github.com/user-attachments/assets/df41467e-0d06-45c9-bdb1-af8357de7e42" />

**Creating tournaments with prize pool**
<img width="744" height="786" alt="telegram-cloud-document-2-5470044724410748316" src="https://github.com/user-attachments/assets/0e4f9fdf-b08a-455b-ae7e-f130f7e367ce" />

**Register windows for players**
<img width="1347" height="800" alt="telegram-cloud-document-2-5470044724410748318" src="https://github.com/user-attachments/assets/b9d49bc2-dc93-4712-855d-a1ce0b3725d7" />


## 🗺️ Roadmap

- [x] Core item management system
- [x] AI valuation integration
- [x] P2P marketplace
- [x] Tournament system
- [ ] Mobile app (iOS/Android)
- [ ] Integration with 10+ more games
- [ ] Advanced AI merge recommendations
- [ ] Social features (guilds, chat)
- [ ] Mainnet deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🔗 Links

- **Live Demo:** [chainarena.online](https://chainarena.inline/)

## 🏆 Built For

**Xsolla Backpack Hackathon** - Revolutionizing gaming economies with decentralized item ownership

## 👥 Team

Built with ❤️ by the ChainArena team

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Tg: @alexlapin7
---

**⭐ If you find this project useful, please consider giving it a star!**
