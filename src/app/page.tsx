import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, User } from 'lucide-react';
import TeamSearchBar from '@/components/TeamSearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TeamSearchBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">NBA Betting Insights</h1>
        <p className="text-lg text-gray-300 mb-8">
          Get expert analysis and predictions for NBA games. Find the best betting opportunities and make informed decisions.
        </p>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">
              <BarChart3 className="mr-2 h-4 w-4" />
              Today's Games
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Users className="mr-2 h-4 w-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="players">
              <User className="mr-2 h-4 w-4" />
              Players
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Example game card - will be populated with real data */}
              <Card>
                <CardHeader>
                  <CardTitle>Lakers vs Warriors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Spread</span>
                      <span className="font-bold">LAL -2.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="font-bold">O/U 225.5</span>
                    </div>
                    <div className="flex justify-between text-green-500">
                      <span>Recommended Bet</span>
                      <span className="font-bold">LAL -2.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Team cards will be populated here */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Select a team to view detailed statistics and betting trends.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Player cards will be populated here */}
              <Card>
                <CardHeader>
                  <CardTitle>Player Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Select a player to view detailed statistics and prop bet recommendations.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
