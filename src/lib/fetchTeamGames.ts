import axios from 'axios';

export async function fetchTeamGames(teamId: number, season?: string, seasonType?: string) {
  const params = season ? `?season=${season}` : '';
  const url = `http://localhost:4000/teams/${teamId}/games${params}${seasonType ? `&season_type=${seasonType}` : ''}`;
  console.log('Fetching games from URL:', url);

  try {
    const res = await axios.get(url);
    console.log('Raw API response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching team games:', error);
    throw new Error('Failed to fetch team games');
  }
}
