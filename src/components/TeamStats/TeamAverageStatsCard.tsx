'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  if (recentGames.length === 0)
    return {
      points: 0,
      fieldGoalPercentage: 0,
      threePointPercentage: 0,
      freeThrowPercentage: 0,
      rebounds: 0,
      assists: 0,
      turnovers: 0,
      plusMinus: 0,
    };

  const totals = recentGames.reduce(
    (acc, game) => ({
      points: acc.points + game.points,
      fieldGoalPercentage: acc.fieldGoalPercentage + game.field_goal_percentage,
      threePointPercentage: acc.threePointPercentage + game.three_point_percentage,
      freeThrowPercentage: acc.freeThrowPercentage + game.free_throw_percentage,
      rebounds: acc.rebounds + game.total_rebounds,
      assists: acc.assists + game.assists,
      turnovers: acc.turnovers + game.turnovers,
      plusMinus: acc.plusMinus + game.plus_minus,
    }),
    {
      points: 0,
      fieldGoalPercentage: 0,
      threePointPercentage: 0,
      freeThrowPercentage: 0,
      rebounds: 0,
      assists: 0,
      turnovers: 0,
      plusMinus: 0,
    }
  );

  return {
    points: Number((totals.points / recentGames.length).toFixed(1)),
    fieldGoalPercentage: Number((totals.fieldGoalPercentage / recentGames.length).toFixed(3)),
    threePointPercentage: Number((totals.threePointPercentage / recentGames.length).toFixed(3)),
    freeThrowPercentage: Number((totals.freeThrowPercentage / recentGames.length).toFixed(3)),
    rebounds: Number((totals.rebounds / recentGames.length).toFixed(1)),
    assists: Number((totals.assists / recentGames.length).toFixed(1)),
    turnovers: Number((totals.turnovers / recentGames.length).toFixed(1)),
    plusMinus: Number((totals.plusMinus / recentGames.length).toFixed(1)),
  };
};

interface StatCardProps {
  title: string;
  stats: StatSummary;
}

const StatCard = ({ title, stats }: StatCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Points</p>
          <p className="text-2xl font-bold">{stats.points}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">FG%</p>
          <p className="text-2xl font-bold">{stats.fieldGoalPercentage}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">3PT%</p>
          <p className="text-2xl font-bold">{stats.threePointPercentage}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">FT%</p>
          <p className="text-2xl font-bold">{stats.freeThrowPercentage}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Rebounds</p>
          <p className="text-2xl font-bold">{stats.rebounds}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Assists</p>
          <p className="text-2xl font-bold">{stats.assists}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Turnovers</p>
          <p className="text-2xl font-bold">{stats.turnovers}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">+/-</p>
          <p
            className={`text-2xl font-bold ${stats.plusMinus >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {stats.plusMinus > 0 ? `+${stats.plusMinus}` : stats.plusMinus}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface TeamAverageStatsCardProps {
  games: TeamGame[];
}

export const TeamAverageStatsCard = ({ games }: TeamAverageStatsCardProps) => {
  const last5GamesStats = calculateStats(games, 5);
  const last10GamesStats = calculateStats(games, 10);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Last 5 Games Average" stats={last5GamesStats} />
        <StatCard title="Last 10 Games Average" stats={last10GamesStats} />
      </div>
    </div>
  );
};
