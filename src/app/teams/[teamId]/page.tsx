"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";
import { fetchTeamGames } from "@/lib/fetchTeamGames";

export default function TeamPage() {
  const params = useParams();
  const teamId = Number(params.teamId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["teamGames", teamId],
    queryFn: () => fetchTeamGames(teamId),
    enabled: !!teamId,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load team games.</div>;
  }

  const games = data?.games || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Team Game Logs</h1>
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="games">
              <BarChart3 className="mr-2 h-4 w-4" />
              Games
            </TabsTrigger>
          </TabsList>
          <TabsContent value="games" className="mt-6">
            <div className="grid gap-4">
              {games.map((game: any) => (
                <Card key={game.game_id}>
                  <CardHeader>
                    <CardTitle>{game.matchup} - {game.game_date}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div>Result: <b>{game.result}</b></div>
                      <div>Points: <b>{game.points}</b></div>
                      <div>FG%: <b>{game.field_goal_percentage}</b></div>
                      <div>3P%: <b>{game.three_point_percentage}</b></div>
                      <div>REB: <b>{game.total_rebounds}</b></div>
                      <div>AST: <b>{game.assists}</b></div>
                      {/* Add more stats as needed */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 