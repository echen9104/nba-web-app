'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import { fetchTeamGames } from '@/lib/fetchTeamGames';
import { getTeamLogo } from '@/lib/teamLogos';

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

export default function TeamPage() {
  const params = useParams();
  const teamId = Number(params.teamId);
  const TeamLogo = getTeamLogo(teamId);

  const { data, isLoading, error } = useQuery<TeamGamesResponse>({
    queryKey: ['teamGames', teamId],
    queryFn: async () => {
      const response = await fetchTeamGames(teamId, "2024-25", "Regular Season,Playoffs");
      console.log('API Response:', response);
      return response;
    },
    enabled: !!teamId,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load team games.</div>;
  }

  console.log('Data in component:', data);
  const games = data?.games || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          {TeamLogo && <TeamLogo size={60} />}
          <h1 className="text-4xl font-bold">Team Game Logs</h1>
        </div>
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="games">
              <BarChart3 className="mr-2 h-4 w-4" />
              Games
            </TabsTrigger>
          </TabsList>
          <TabsContent value="games" className="mt-6">
            <div className="grid gap-4">
              {games.length > 0 ? (
                games.map(game => {
                  const [homeTeam, awayTeam] = game.matchup.split(' vs. ');
                  const HomeTeamLogo = getTeamLogo(Number(homeTeam));
                  const AwayTeamLogo = getTeamLogo(Number(awayTeam));
                  
                  return (
                    <Card key={game.game_id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {homeTeam} {HomeTeamLogo && <HomeTeamLogo size={40} />}
                            <span>vs</span>
                            {awayTeam} {AwayTeamLogo && <AwayTeamLogo size={40} />}
                          </div>
                          <CardTitle>
                            {new Date(game.game_date).toLocaleDateString()}
                          </CardTitle>
                        </div>
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
                            FT:{' '}
                            <b>
                              {game.free_throws_made}/{game.free_throws_attempted}
                            </b>{' '}
                            ({game.free_throw_percentage.toFixed(3)})
                          </div>
                          <div>
                            Rebounds: <b>{game.total_rebounds}</b> (O: {game.offensive_rebounds}, D:{' '}
                            {game.defensive_rebounds})
                          </div>
                          <div>
                            Assists: <b>{game.assists}</b>
                          </div>
                          <div>
                            Turnovers: <b>{game.turnovers}</b>
                          </div>
                          <div>
                            Plus/Minus: <b>{game.plus_minus}</b>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center text-gray-500">No games found for this team.</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
