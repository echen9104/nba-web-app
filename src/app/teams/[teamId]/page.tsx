'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import { fetchTeamGames } from '@/lib/fetchTeamGames';
import { getTeamLogo } from '@/lib/teamLogos';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface StatSummary {
  points: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  rebounds: number;
  assists: number;
  turnovers: number;
  plusMinus: number;
}

const calculateStats = (games: TeamGame[], count: number): StatSummary => {
  const recentGames = games.slice(0, count);
  if (recentGames.length === 0) return {
    points: 0,
    fieldGoalPercentage: 0,
    threePointPercentage: 0,
    freeThrowPercentage: 0,
    rebounds: 0,
    assists: 0,
    turnovers: 0,
    plusMinus: 0
  };

  const totals = recentGames.reduce((acc, game) => ({
    points: acc.points + game.points,
    fieldGoalPercentage: acc.fieldGoalPercentage + game.field_goal_percentage,
    threePointPercentage: acc.threePointPercentage + game.three_point_percentage,
    freeThrowPercentage: acc.freeThrowPercentage + game.free_throw_percentage,
    rebounds: acc.rebounds + game.total_rebounds,
    assists: acc.assists + game.assists,
    turnovers: acc.turnovers + game.turnovers,
    plusMinus: acc.plusMinus + game.plus_minus
  }), {
    points: 0,
    fieldGoalPercentage: 0,
    threePointPercentage: 0,
    freeThrowPercentage: 0,
    rebounds: 0,
    assists: 0,
    turnovers: 0,
    plusMinus: 0
  });

  return {
    points: Number((totals.points / recentGames.length).toFixed(1)),
    fieldGoalPercentage: Number((totals.fieldGoalPercentage / recentGames.length).toFixed(3)),
    threePointPercentage: Number((totals.threePointPercentage / recentGames.length).toFixed(3)),
    freeThrowPercentage: Number((totals.freeThrowPercentage / recentGames.length).toFixed(3)),
    rebounds: Number((totals.rebounds / recentGames.length).toFixed(1)),
    assists: Number((totals.assists / recentGames.length).toFixed(1)),
    turnovers: Number((totals.turnovers / recentGames.length).toFixed(1)),
    plusMinus: Number((totals.plusMinus / recentGames.length).toFixed(1))
  };
};

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
  const last5GamesStats = calculateStats(games, 5);
  const last10GamesStats = calculateStats(games, 10);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          {TeamLogo && <TeamLogo size={60} />}
          <h1 className="text-4xl font-bold">Team Game Logs</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Team Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Last 5 Games Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Points</p>
                    <p className="text-2xl font-bold">{last5GamesStats.points}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FG%</p>
                    <p className="text-2xl font-bold">{last5GamesStats.fieldGoalPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">3PT%</p>
                    <p className="text-2xl font-bold">{last5GamesStats.threePointPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FT%</p>
                    <p className="text-2xl font-bold">{last5GamesStats.freeThrowPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rebounds</p>
                    <p className="text-2xl font-bold">{last5GamesStats.rebounds}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assists</p>
                    <p className="text-2xl font-bold">{last5GamesStats.assists}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Turnovers</p>
                    <p className="text-2xl font-bold">{last5GamesStats.turnovers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">+/-</p>
                    <p className={`text-2xl font-bold ${last5GamesStats.plusMinus >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {last5GamesStats.plusMinus > 0 ? `+${last5GamesStats.plusMinus}` : last5GamesStats.plusMinus}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last 10 Games Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Points</p>
                    <p className="text-2xl font-bold">{last10GamesStats.points}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FG%</p>
                    <p className="text-2xl font-bold">{last10GamesStats.fieldGoalPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">3PT%</p>
                    <p className="text-2xl font-bold">{last10GamesStats.threePointPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FT%</p>
                    <p className="text-2xl font-bold">{last10GamesStats.freeThrowPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rebounds</p>
                    <p className="text-2xl font-bold">{last10GamesStats.rebounds}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assists</p>
                    <p className="text-2xl font-bold">{last10GamesStats.assists}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Turnovers</p>
                    <p className="text-2xl font-bold">{last10GamesStats.turnovers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">+/-</p>
                    <p className={`text-2xl font-bold ${last10GamesStats.plusMinus >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {last10GamesStats.plusMinus > 0 ? `+${last10GamesStats.plusMinus}` : last10GamesStats.plusMinus}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="games">
              <BarChart3 className="mr-2 h-4 w-4" />
              Games
            </TabsTrigger>
          </TabsList>
          <TabsContent value="games" className="mt-6">
            {games.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Matchup</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>PTS</TableHead>
                      <TableHead>FG</TableHead>
                      <TableHead>3PT</TableHead>
                      <TableHead>FT</TableHead>
                      <TableHead>REB</TableHead>
                      <TableHead>AST</TableHead>
                      <TableHead>TO</TableHead>
                      <TableHead>+/-</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {games.map((game) => (
                      <TableRow key={game.game_id}>
                        <TableCell>{new Date(game.game_date).toLocaleDateString()}</TableCell>
                        <TableCell>{game.matchup}</TableCell>
                        <TableCell>
                          <span className={`font-bold ${game.result === 'W' ? 'text-green-500' : 'text-red-500'}`}>
                            {game.result}
                          </span>
                        </TableCell>
                        <TableCell>{game.points}</TableCell>
                        <TableCell>
                          {game.field_goals_made}/{game.field_goals_attempted}
                          <span className="text-sm text-gray-500 ml-1">
                            ({game.field_goal_percentage.toFixed(1)}%)
                          </span>
                        </TableCell>
                        <TableCell>
                          {game.three_pointers_made}/{game.three_pointers_attempted}
                          <span className="text-sm text-gray-500 ml-1">
                            ({game.three_point_percentage.toFixed(1)}%)
                          </span>
                        </TableCell>
                        <TableCell>
                          {game.free_throws_made}/{game.free_throws_attempted}
                          <span className="text-sm text-gray-500 ml-1">
                            ({game.free_throw_percentage.toFixed(1)}%)
                          </span>
                        </TableCell>
                        <TableCell>{game.total_rebounds}</TableCell>
                        <TableCell>{game.assists}</TableCell>
                        <TableCell>{game.turnovers}</TableCell>
                        <TableCell>
                          <span className={`font-bold ${game.plus_minus >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {game.plus_minus > 0 ? `+${game.plus_minus}` : game.plus_minus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center text-gray-500">No games found for this team.</div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
