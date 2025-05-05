import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Trophy, TrendingUp } from "lucide-react";

export default function TeamPage({ params }: { params: { teamId: string } }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Team Analysis</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Trophy className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="mr-2 h-4 w-4" />
              Betting Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Season Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Record</span>
                      <span className="font-bold">42-30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Home Record</span>
                      <span className="font-bold">25-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Away Record</span>
                      <span className="font-bold">17-18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Last 10 Games</span>
                      <span className="font-bold">7-3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-bold text-green-500">W3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Offensive Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Points per Game</span>
                      <span className="font-bold">115.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Field Goal %</span>
                      <span className="font-bold">47.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3-Point %</span>
                      <span className="font-bold">36.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Defensive Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Points Allowed</span>
                      <span className="font-bold">112.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opponent FG%</span>
                      <span className="font-bold">46.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blocks per Game</span>
                      <span className="font-bold">4.8</span>
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
                  <CardTitle>Betting Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>ATS Record</span>
                      <span className="font-bold">38-34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Over/Under Record</span>
                      <span className="font-bold">36-36</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Home ATS</span>
                      <span className="font-bold">22-15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Betting Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Last 5 ATS</span>
                      <span className="font-bold text-green-500">4-1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last 5 O/U</span>
                      <span className="font-bold text-red-500">2-3</span>
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