import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Trophy, Clock } from "lucide-react";

const mockTournaments = [
  {
    id: 1,
    name: "CS:GO Winter Championship 2025",
    game: "CS:GO",
    prizePool: "5.5 ETH",
    prizePoolUSD: "$18,500",
    entryFee: "Free",
    players: "24/32",
    status: "Open",
    startDate: "2025-11-01",
    gameColor: "from-orange-500 to-yellow-500",
  },
  {
    id: 2,
    name: "Dota 2 Pro League",
    game: "Dota 2",
    prizePool: "10 ETH",
    prizePoolUSD: "$33,700",
    entryFee: "0.1 ETH",
    players: "16/16",
    status: "Starting Soon",
    startDate: "2025-10-28",
    gameColor: "from-red-500 to-pink-500",
  },
  {
    id: 3,
    name: "Valorant Community Cup",
    game: "Valorant",
    prizePool: "3.2 ETH",
    prizePoolUSD: "$10,784",
    entryFee: "Free",
    players: "18/64",
    status: "Open",
    startDate: "2025-11-05",
    gameColor: "from-red-600 to-rose-400",
  },
  {
    id: 4,
    name: "League of Legends Seasonal",
    game: "League of Legends",
    prizePool: "8 ETH",
    prizePoolUSD: "$26,960",
    entryFee: "0.05 ETH",
    players: "32/64",
    status: "Open",
    startDate: "2025-11-03",
    gameColor: "from-blue-500 to-cyan-400",
  },
  {
    id: 5,
    name: "Minecraft Build Battle Elite",
    game: "Minecraft",
    prizePool: "2 ETH",
    prizePoolUSD: "$6,740",
    entryFee: "Free",
    players: "45/128",
    status: "Open",
    startDate: "2025-11-02",
    gameColor: "from-green-600 to-emerald-400",
  },
  {
    id: 6,
    name: "Rocket League Grand Prix",
    game: "Rocket League",
    prizePool: "4.5 ETH",
    prizePoolUSD: "$15,165",
    entryFee: "0.08 ETH",
    players: "12/32",
    status: "Open",
    startDate: "2025-11-04",
    gameColor: "from-blue-600 to-indigo-500",
  },
];

const Browse = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Tournaments</h1>
          <p className="text-xl text-muted-foreground">
            Join competitive tournaments and win prizes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tournaments..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Tournament Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTournaments.map((tournament) => (
            <Card key={tournament.id} className="overflow-hidden hover:border-primary/50 transition-all group">
              <div className={`h-32 bg-gradient-to-br ${tournament.gameColor} relative`}>
                <div className="absolute top-4 right-4">
                  <Badge className={tournament.status === "Open" ? "bg-success" : "bg-warning"}>
                    {tournament.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">{tournament.game}</p>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {tournament.name}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm">Prize Pool</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{tournament.prizePool}</p>
                      <p className="text-xs text-muted-foreground">{tournament.prizePoolUSD}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Players</span>
                    </div>
                    <p className="font-semibold">{tournament.players}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Entry Fee</span>
                    </div>
                    <p className="font-semibold">{tournament.entryFee}</p>
                  </div>
                </div>

                <Button className="w-full">
                  {tournament.status === "Open" ? "Register Now" : "View Tournament"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
