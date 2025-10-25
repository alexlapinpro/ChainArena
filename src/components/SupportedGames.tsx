import { Card } from "@/components/ui/card";
import csgoLogo from "@/assets/games/csgo-logo.png";
import dota2Logo from "@/assets/games/dota2-logo.png";
import valorantLogo from "@/assets/games/valorant-logo.png";
import lolLogo from "@/assets/games/lol-logo.png";
import minecraftLogo from "@/assets/games/minecraft-logo.png";
import rocketLeagueLogo from "@/assets/games/rocket-league-logo.png";

const games = [
  { name: "CS:GO", logo: csgoLogo },
  { name: "Dota 2", logo: dota2Logo },
  { name: "Valorant", logo: valorantLogo },
  { name: "League of Legends", logo: lolLogo },
  { name: "Minecraft", logo: minecraftLogo },
  { name: "Rocket League", logo: rocketLeagueLogo },
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
              <div className="h-20 w-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,0,107,0.5)] transition-all duration-300">
                <img 
                  src={game.logo} 
                  alt={`${game.name} logo`}
                  className="max-h-20 max-w-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-center font-semibold text-sm">{game.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
