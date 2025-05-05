'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nbaTeams } from '@/lib/nbaTeams';

export default function TeamSearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const filteredTeams = nbaTeams.filter(team =>
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (teamId: number) => {
    router.push(`/teams/${teamId}`);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search for a team..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && query && (
        <ul className="absolute z-10 w-full max-w-md bg-white dark:bg-gray-800 border rounded mt-2 shadow-lg">
          {filteredTeams.length === 0 && <li className="p-2 text-gray-500">No teams found</li>}
          {filteredTeams.map(team => (
            <li
              key={team.id}
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSelect(team.id)}
            >
              {team.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
