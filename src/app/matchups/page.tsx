'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { nbaTeams } from '@/lib/nbaTeams';
import { getTeamLogo, teamIdToAbbr } from '@/lib/teamLogos';
import { fetchTeamMatchups } from '@/lib/fetchTeamMatchups';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function MatchupsPage() {
  const [team1Id, setTeam1Id] = useState<number | null>(null);
  const [team2Id, setTeam2Id] = useState<number | null>(null);

  const team1Abbr = team1Id ? teamIdToAbbr[team1Id] : undefined;
  const team2Abbr = team2Id ? teamIdToAbbr[team2Id] : undefined;

  const { data: matchups, isLoading } = useQuery({
    queryKey: ['teamMatchups', team1Abbr, team2Abbr],
    queryFn: () => fetchTeamMatchups(team1Abbr!, team2Abbr!, '2024-25', 'Regular Season,Playoffs'),
    enabled: !!team1Abbr && !!team2Abbr,
  });

  const Team1Logo = team1Id ? getTeamLogo(team1Id) : null;
  const Team2Logo = team2Id ? getTeamLogo(team2Id) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Team Matchups</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Team 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={value => setTeam1Id(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {nbaTeams.map(team => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={value => setTeam2Id(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {nbaTeams.map(team => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {team1Id && team2Id && (
          <div className="flex items-center justify-center gap-4 mb-8">
            {Team1Logo && <Team1Logo size={60} />}
            <span className="text-2xl font-bold">vs</span>
            {Team2Logo && <Team2Logo size={60} />}
          </div>
        )}

        {isLoading ? (
          <div className="text-center">Loading matchups...</div>
        ) : matchups && matchups.games && matchups.games.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Matchup</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>{team1Abbr} PTS</TableHead>
                  <TableHead>{team2Abbr} PTS</TableHead>
                  <TableHead>{team1Abbr} FG</TableHead>
                  <TableHead>{team2Abbr} FG</TableHead>
                  <TableHead>{team1Abbr} 3PT</TableHead>
                  <TableHead>{team2Abbr} 3PT</TableHead>
                  <TableHead>{team1Abbr} FT</TableHead>
                  <TableHead>{team2Abbr} FT</TableHead>
                  <TableHead>{team1Abbr} REB</TableHead>
                  <TableHead>{team2Abbr} REB</TableHead>
                  <TableHead>{team1Abbr} AST</TableHead>
                  <TableHead>{team2Abbr} AST</TableHead>
                  <TableHead>{team1Abbr} TO</TableHead>
                  <TableHead>{team2Abbr} TO</TableHead>
                  <TableHead>{team1Abbr} +/-</TableHead>
                  <TableHead>{team2Abbr} +/-</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchups.games.map((game: any) => (
                  <TableRow key={game.game_id}>
                    <TableCell>{new Date(game.game_date).toLocaleDateString()}</TableCell>
                    <TableCell>{game.matchup.replace('@', 'vs.')}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${game.result === 'W' ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {game.result}
                      </span>
                    </TableCell>
                    <TableCell>{game.team1_stats.points}</TableCell>
                    <TableCell>{game.team2_stats.points}</TableCell>
                    <TableCell>
                      {game.team1_stats.field_goals_made}/{game.team1_stats.field_goals_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team1_stats.field_goal_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {game.team2_stats.field_goals_made}/{game.team2_stats.field_goals_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team2_stats.field_goal_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {game.team1_stats.three_pointers_made}/
                      {game.team1_stats.three_pointers_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team1_stats.three_point_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {game.team2_stats.three_pointers_made}/
                      {game.team2_stats.three_pointers_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team2_stats.three_point_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {game.team1_stats.free_throws_made}/{game.team1_stats.free_throws_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team1_stats.free_throw_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {game.team2_stats.free_throws_made}/{game.team2_stats.free_throws_attempted}
                      <span className="text-sm text-gray-500 ml-1">
                        ({(game.team2_stats.free_throw_percentage * 100).toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>{game.team1_stats.total_rebounds}</TableCell>
                    <TableCell>{game.team2_stats.total_rebounds}</TableCell>
                    <TableCell>{game.team1_stats.assists}</TableCell>
                    <TableCell>{game.team2_stats.assists}</TableCell>
                    <TableCell>{game.team1_stats.turnovers}</TableCell>
                    <TableCell>{game.team2_stats.turnovers}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${game.team1_stats.plus_minus >= 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {game.team1_stats.plus_minus > 0
                          ? `+${game.team1_stats.plus_minus}`
                          : game.team1_stats.plus_minus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${game.team2_stats.plus_minus >= 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {game.team2_stats.plus_minus > 0
                          ? `+${game.team2_stats.plus_minus}`
                          : game.team2_stats.plus_minus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : team1Id && team2Id ? (
          <div className="text-center text-gray-500">
            No games found between the selected teams for the chosen season and game type.
          </div>
        ) : null}
      </main>
    </div>
  );
}
