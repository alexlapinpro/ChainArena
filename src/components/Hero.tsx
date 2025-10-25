import { Button } from "@/components/ui/button";
import { Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6 glow-primary">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-semibold">Powered by Xsolla</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight">
            Your Fair On-Chain{" "}
            <span className="gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Tournaments for Games &amp; Esports
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Transparent prize pools, automatic distribution, zero trust required.
            The future of competitive gaming is here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="glow-primary-lg text-lg">
                <Trophy className="mr-2 h-5 w-5" />
                Create Tournament
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="text-lg">
                Browse Tournaments
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5M+</p>
              <p className="text-sm text-muted-foreground">Total Prize Pool</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">1,247</p>
              <p className="text-sm text-muted-foreground">Active Tournaments</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">45K+</p>
              <p className="text-sm text-muted-foreground">Registered Players</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">2.5%</p>
              <p className="text-sm text-muted-foreground">Platform Fee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
