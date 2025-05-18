'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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
import { TeamAverageStatsCard } from '@/components/TeamStats/TeamAverageStatsCard';

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

        <TeamAverageStatsCard games={games} />

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
                        <TableCell>{game.matchup.replace('@', 'vs.')}</TableCell>
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
      </main>
    </div>
  );
}
