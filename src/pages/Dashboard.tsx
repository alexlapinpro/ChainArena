import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage your tournaments and track your performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-5 w-5 text-primary" />
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <p className="text-3xl font-bold mb-1">12</p>
            <p className="text-sm text-muted-foreground">Tournaments Played</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-5 w-5 text-success" />
            </div>
            <p className="text-3xl font-bold mb-1">3</p>
            <p className="text-sm text-muted-foreground">Tournaments Won</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold mb-1">2.5 ETH</p>
            <p className="text-sm text-muted-foreground">Total Winnings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-5 w-5 text-warning" />
            </div>
            <p className="text-3xl font-bold mb-1">75%</p>
            <p className="text-sm text-muted-foreground">Win Rate</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Create New Tournament</h3>
                  <p className="text-sm text-muted-foreground">Set up your own competition</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Trophy className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Browse Tournaments</h3>
                  <p className="text-sm text-muted-foreground">Find competitions to join</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Active Tournaments */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Active Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-success">In Progress</Badge>
                <span className="text-sm text-muted-foreground">CS:GO</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Winter Championship</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-semibold">5.5 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-semibold">32/32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Match:</span>
                  <span className="font-semibold text-primary">Round 2</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">View Bracket</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-warning">Starting Soon</Badge>
                <span className="text-sm text-muted-foreground">Valorant</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Community Cup</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-semibold">3.2 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-semibold">58/64</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Starts:</span>
                  <span className="font-semibold">In 2 days</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">View Details</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge>Registered</Badge>
                <span className="text-sm text-muted-foreground">Dota 2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Pro League Season 3</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-semibold">10 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-semibold">14/16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Starts:</span>
                  <span className="font-semibold">In 5 days</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">View Details</Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
