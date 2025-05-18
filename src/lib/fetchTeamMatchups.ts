import axios from 'axios';

export async function fetchTeamMatchups(
  team1Abbr: string,
  team2Abbr: string,
  season?: string,
  seasonType?: string
) {
  const params = new URLSearchParams();
  params.append('team1', team1Abbr);
  params.append('team2', team2Abbr);
  if (season) params.append('season', season);
  if (seasonType) params.append('season_type', seasonType);
  const url = `http://localhost:4000/teams/matchups?${params.toString()}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Error fetching team matchups:', error);
    throw new Error('Failed to fetch team matchups');
  }
}
