import { Card } from "@/components/ui/card";
import { Trophy, Users, Wallet } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Create & Deposit",
    description: "Create tournament and deposit prize pool to smart contract. Funds are locked and transparent.",
  },
  {
    icon: Users,
    title: "Players Compete",
    description: "Players register and compete in their favorite games. Brackets auto-generate and results are tracked.",
  },
  {
    icon: Trophy,
    title: "Instant Payouts",
    description: "Winners receive automatic payouts instantly to their wallets. No delays, no manual processing.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to run transparent, trustless esports tournaments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {index + 1}
              </div>
              <div className="relative">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
