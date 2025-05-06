'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Search } from 'lucide-react';
import TeamSearchBar from '@/components/TeamSearchBar/TeamSearchBar';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamGames } from '@/lib/fetchTeamGames';
import { nbaTeams } from '@/lib/nbaTeams';

interface TeamGame {
  game_id: string;
  game_date: string;
  matchup: string;
  result: string;
  points: number;
  field_goals_made: number;
  field_goals_attempted: number;
  field_goal_percentage: number;
  three_pointers_made: number;
  three_pointers_attempted: number;
  three_point_percentage: number;
  free_throws_made: number;
  free_throws_attempted: number;
  free_throw_percentage: number;
  offensive_rebounds: number;
  defensive_rebounds: number;
  total_rebounds: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  blocks_against: number;
  personal_fouls: number;
  personal_fouls_drawn: number;
  plus_minus: number;
}

interface TeamGamesResponse {
  team_id: number;
  season: string;
  games_played: number;
  games: TeamGame[];
}

export default function TeamsPage() {
  // Fetch recent games for a few popular teams
  const { data: celticsGames, isLoading: isLoadingCeltics } = useQuery<TeamGamesResponse>({
    queryKey: ['teamGames', 1610612738], // Celtics
    queryFn: () => fetchTeamGames(1610612738),
  });

  const { data: lakersGames, isLoading: isLoadingLakers } = useQuery<TeamGamesResponse>({
    queryKey: ['teamGames', 1610612747], // Lakers
    queryFn: () => fetchTeamGames(1610612747),
  });

  const { data: warriorsGames, isLoading: isLoadingWarriors } = useQuery<TeamGamesResponse>({
    queryKey: ['teamGames', 1610612744], // Warriors
    queryFn: () => fetchTeamGames(1610612744),
  });

  const isLoading = isLoadingCeltics || isLoadingLakers || isLoadingWarriors;
  const recentGames = [
    ...(celticsGames?.games.slice(0, 2) || []),
    ...(lakersGames?.games.slice(0, 2) || []),
    ...(warriorsGames?.games.slice(0, 2) || []),
  ].sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">NBA Teams</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Teams</h2>
          <TeamSearchBar />
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">
              <BarChart3 className="mr-2 h-4 w-4" />
              Recent Games
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Search className="mr-2 h-4 w-4" />
              All Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-4">
              {isLoading ? (
                <div className="text-center">Loading recent games...</div>
              ) : recentGames.length > 0 ? (
                recentGames.map(game => (
                  <Card key={game.game_id}>
                    <CardHeader>
                      <CardTitle>
                        {game.matchup} - {new Date(game.game_date).toLocaleDateString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <div>
                          Result: <b>{game.result === 'W' ? 'Win' : 'Loss'}</b>
                        </div>
                        <div>
                          Points: <b>{game.points}</b>
                        </div>
                        <div>
                          FG:{' '}
                          <b>
                            {game.field_goals_made}/{game.field_goals_attempted}
                          </b>{' '}
                          ({game.field_goal_percentage.toFixed(3)})
                        </div>
                        <div>
                          3PT:{' '}
                          <b>
                            {game.three_pointers_made}/{game.three_pointers_attempted}
                          </b>{' '}
                          ({game.three_point_percentage.toFixed(3)})
                        </div>
                        <div>
                          Plus/Minus: <b>{game.plus_minus}</b>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center text-gray-500">No recent games found.</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nbaTeams.map(team => (
                <Card key={team.id}>
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div>ID: {team.id}</div>
                      <a
                        href={`/teams/${team.id}`}
                        className="text-blue-500 hover:text-blue-700 hover:underline"
                      >
                        View Team Details
                      </a>
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
