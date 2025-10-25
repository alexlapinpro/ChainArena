import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12 border-2 border-primary/30 shadow-xl shadow-primary/20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to organize your first tournament?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of organizers using blockchain technology to run fair, transparent esports competitions.
          </p>
          <Link to="/create">
            <Button size="lg" className="glow-primary-lg text-lg shadow-xl">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
