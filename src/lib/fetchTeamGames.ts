import axios from "axios";

export async function fetchTeamGames(teamId: number, season?: string) {
  const params = season ? `?season=${season}` : '';
  const url = `http://localhost:4000/teams/${teamId}/games${params}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch team games');
  }
} 