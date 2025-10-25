import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trophy, Calendar, Users, DollarSign } from "lucide-react";

const CreateTournament = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Tournament</h1>
          <p className="text-xl text-muted-foreground">
            Set up your esports tournament with on-chain prize distribution
          </p>
        </div>

        <form className="space-y-8">
          {/* Basic Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tournament Name</Label>
                <Input id="name" placeholder="e.g., CS:GO Winter Championship 2025" />
              </div>

              <div>
                <Label htmlFor="game">Game</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csgo">CS:GO</SelectItem>
                    <SelectItem value="dota2">Dota 2</SelectItem>
                    <SelectItem value="valorant">Valorant</SelectItem>
                    <SelectItem value="lol">League of Legends</SelectItem>
                    <SelectItem value="minecraft">Minecraft</SelectItem>
                    <SelectItem value="rocketleague">Rocket League</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your tournament..."
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Tournament Format */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Tournament Format</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Format Type</Label>
                <RadioGroup defaultValue="single-elimination">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="single-elimination" id="single" />
                    <Label htmlFor="single" className="font-normal cursor-pointer">
                      Single Elimination
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="double-elimination" id="double" />
                    <Label htmlFor="double" className="font-normal cursor-pointer">
                      Double Elimination
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="round-robin" id="robin" />
                    <Label htmlFor="robin" className="font-normal cursor-pointer">
                      Round Robin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="swiss" id="swiss" />
                    <Label htmlFor="swiss" className="font-normal cursor-pointer">
                      Swiss System
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-players">Max Participants</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8 Players</SelectItem>
                      <SelectItem value="16">16 Players</SelectItem>
                      <SelectItem value="32">32 Players</SelectItem>
                      <SelectItem value="64">64 Players</SelectItem>
                      <SelectItem value="128">128 Players</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="match-format">Match Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bo1">Best of 1</SelectItem>
                      <SelectItem value="bo3">Best of 3</SelectItem>
                      <SelectItem value="bo5">Best of 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Prize Pool */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Prize Pool Setup</h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Prize Pool Amount</Label>
                  <Input id="amount" type="number" placeholder="5.0" />
                </div>
              </div>

              <div>
                <Label htmlFor="distribution">Distribution Model</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-30-20">50/30/20 (1st/2nd/3rd)</SelectItem>
                    <SelectItem value="60-40">60/40 (1st/2nd)</SelectItem>
                    <SelectItem value="40-30-20-10">40/30/20/10 (Top 4)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Prize Distribution Preview</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1st Place:</span>
                    <span className="font-semibold">2.5 ETH (50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2nd Place:</span>
                    <span className="font-semibold">1.5 ETH (30%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3rd Place:</span>
                    <span className="font-semibold">1.0 ETH (20%)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Schedule</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date & Time</Label>
                <Input id="start-date" type="datetime-local" />
              </div>

              <div>
                <Label htmlFor="reg-deadline">Registration Deadline</Label>
                <Input id="reg-deadline" type="datetime-local" />
              </div>
            </div>
          </Card>

          {/* Submit */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Prize Pool:</span>
                <span className="font-bold">5.0 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee (2.5%):</span>
                <span className="font-bold">0.125 ETH</span>
              </div>
              <div className="flex justify-between text-lg border-t border-border pt-4">
                <span className="font-semibold">Total Deposit Required:</span>
                <span className="font-bold text-primary">5.125 ETH</span>
              </div>

              <Button className="w-full glow-primary-lg" size="lg">
                Deposit & Create Tournament
              </Button>
            </div>
          </Card>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTournament;
