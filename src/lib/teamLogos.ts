import * as NBAIcons from 'react-nba-logos';

// Map of team IDs to their abbreviations
export const teamIdToAbbr: { [key: number]: string } = {
  1610612737: 'ATL', // Hawks
  1610612738: 'BOS', // Celtics
  1610612751: 'BKN', // Nets
  1610612766: 'CHA', // Hornets
  1610612741: 'CHI', // Bulls
  1610612739: 'CLE', // Cavaliers
  1610612742: 'DAL', // Mavericks
  1610612743: 'DEN', // Nuggets
  1610612765: 'DET', // Pistons
  1610612744: 'GSW', // Warriors
  1610612745: 'HOU', // Rockets
  1610612754: 'IND', // Pacers
  1610612746: 'LAC', // Clippers
  1610612747: 'LAL', // Lakers
  1610612763: 'MEM', // Grizzlies
  1610612748: 'MIA', // Heat
  1610612749: 'MIL', // Bucks
  1610612750: 'MIN', // Timberwolves
  1610612740: 'NOP', // Pelicans
  1610612752: 'NYK', // Knicks
  1610612760: 'OKC', // Thunder
  1610612753: 'ORL', // Magic
  1610612755: 'PHI', // 76ers
  1610612756: 'PHX', // Suns
  1610612757: 'POR', // Trail Blazers
  1610612758: 'SAC', // Kings
  1610612759: 'SAS', // Spurs
  1610612761: 'TOR', // Raptors
  1610612762: 'UTA', // Jazz
  1610612764: 'WAS', // Wizards
};

// Map of team abbreviations to their logo components
export const abbrToLogo: { [key: string]: any } = {
  ATL: NBAIcons.ATL,
  BOS: NBAIcons.BOS,
  BKN: NBAIcons.BKN,
  CHA: NBAIcons.CHA,
  CHI: NBAIcons.CHI,
  CLE: NBAIcons.CLE,
  DAL: NBAIcons.DAL,
  DEN: NBAIcons.DEN,
  DET: NBAIcons.DET,
  GSW: NBAIcons.GSW,
  HOU: NBAIcons.HOU,
  IND: NBAIcons.IND,
  LAC: NBAIcons.LAC,
  LAL: NBAIcons.LAL,
  MEM: NBAIcons.MEM,
  MIA: NBAIcons.MIA,
  MIL: NBAIcons.MIL,
  MIN: NBAIcons.MIN,
  NOP: NBAIcons.NOP,
  NYK: NBAIcons.NYK,
  OKC: NBAIcons.OKC,
  ORL: NBAIcons.ORL,
  PHI: NBAIcons.PHI,
  PHX: NBAIcons.PHX,
  POR: NBAIcons.POR,
  SAC: NBAIcons.SAC,
  SAS: NBAIcons.SAS,
  TOR: NBAIcons.TOR,
  UTA: NBAIcons.UTA,
  WAS: NBAIcons.WAS,
};

/**
 * Get a team's logo component by team ID
 * @param teamId - The NBA team ID
 * @returns The team's logo component or null if not found
 */
export const getTeamLogoById = (teamId: number) => {
  const abbr = teamIdToAbbr[teamId];
  return abbr ? abbrToLogo[abbr] : null;
};

/**
 * Get a team's logo component by team abbreviation
 * @param abbr - The team's abbreviation (e.g., 'LAL' for Lakers)
 * @returns The team's logo component or null if not found
 */
export const getTeamLogoByAbbr = (abbr: string) => {
    console.log(abbrToLogo[abbr.toUpperCase()])
  return abbrToLogo[abbr.toUpperCase()] || null;
};

/**
 * Get a team's logo component by either ID or abbreviation
 * @param identifier - Either a team ID (number) or abbreviation (string)
 * @returns The team's logo component or null if not found
 */
export const getTeamLogo = (identifier: number | string) => {
  if (typeof identifier === 'number') {
    return getTeamLogoById(identifier);
  }
  return getTeamLogoByAbbr(identifier);
};