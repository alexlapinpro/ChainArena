import { Card } from "@/components/ui/card";
import { Shield, Zap, DollarSign, Gamepad2 } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Full Transparency",
    description: "Prize pool visible on-chain. Every transaction is verifiable on Etherscan.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description: "No 30-90 day delays. Winners get paid immediately after tournament ends.",
    color: "text-secondary",
  },
  {
    icon: DollarSign,
    title: "Low Fees",
    description: "Only 2.5% platform fee vs 5-15% on traditional platforms.",
    color: "text-success",
  },
  {
    icon: Gamepad2,
    title: "Any Game",
    description: "Support for CS:GO, Dota 2, Valorant, League of Legends, Minecraft and more.",
    color: "text-warning",
  },
];

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why ChainArena?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for organizers and players who demand transparency and speed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300`}>
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
