import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setAddress("0x1234...5678");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              ChainArena
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link to="/create" className="text-foreground hover:text-primary transition-colors">
              Create
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isConnected ? (
            <Button onClick={connectWallet} className="glow-primary">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-muted rounded-lg">
                <p className="text-sm font-mono">{address}</p>
              </div>
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
