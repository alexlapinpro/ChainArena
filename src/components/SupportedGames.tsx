import { Card } from "@/components/ui/card";

const games = [
  { name: "CS:GO", color: "from-orange-500 to-yellow-500" },
  { name: "Dota 2", color: "from-red-500 to-pink-500" },
  { name: "Valorant", color: "from-red-600 to-rose-400" },
  { name: "League of Legends", color: "from-blue-500 to-cyan-400" },
  { name: "Minecraft", color: "from-green-600 to-emerald-400" },
  { name: "Rocket League", color: "from-blue-600 to-indigo-500" },
];

export const SupportedGames = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Supported Games</h2>
          <p className="text-xl text-muted-foreground">
            Run tournaments for your favorite competitive games
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
              <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${game.color} mx-auto mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`} />
              <p className="text-center font-semibold text-sm">{game.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
