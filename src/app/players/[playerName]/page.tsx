import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Target, TrendingUp } from "lucide-react";

export default function PlayerPage({ params }: { params: { playerName: string } }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Player Analysis</h1>
        
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">
              <BarChart3 className="mr-2 h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="props">
              <Target className="mr-2 h-4 w-4" />
              Prop Bets
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="mr-2 h-4 w-4" />
              Betting Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Season Averages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Points</span>
                      <span className="font-bold">28.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebounds</span>
                      <span className="font-bold">7.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assists</span>
                      <span className="font-bold">6.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Steals</span>
                      <span className="font-bold">1.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blocks</span>
                      <span className="font-bold">0.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shooting Percentages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Field Goal %</span>
                      <span className="font-bold">48.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3-Point %</span>
                      <span className="font-bold">38.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free Throw %</span>
                      <span className="font-bold">87.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="props" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Prop Bets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Points</span>
                      <span className="font-bold">O/U 27.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebounds</span>
                      <span className="font-bold">O/U 6.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assists</span>
                      <span className="font-bold">O/U 7.0</span>
                    </div>
                    <div className="flex justify-between text-green-500">
                      <span>Recommended Bet</span>
                      <span className="font-bold">Points Over 27.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prop Bet Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Points Over/Under</span>
                      <span className="font-bold">24-18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebounds Over/Under</span>
                      <span className="font-bold">20-22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assists Over/Under</span>
                      <span className="font-bold">22-20</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Last 5 Games PPG</span>
                      <span className="font-bold">31.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last 5 Games RPG</span>
                      <span className="font-bold">6.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last 5 Games APG</span>
                      <span className="font-bold">7.4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Matchup Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>vs Opponent PPG</span>
                      <span className="font-bold">29.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>vs Opponent FG%</span>
                      <span className="font-bold">49.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Meeting Points</span>
                      <span className="font-bold">32</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 