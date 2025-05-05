'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { nbaTeams } from '@/lib/nbaTeams';

export default function TeamSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredTeams = nbaTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamSelect = (teamId: number) => {
    router.push(`/teams/${teamId}`);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Search for a team..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      {searchTerm && filteredTeams.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {filteredTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => handleTeamSelect(team.id)}
              className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground"
            >
              {team.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 