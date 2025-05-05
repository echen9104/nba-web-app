"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nbaTeams } from "@/lib/nbaTeams";

export default function TeamSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredTeams = nbaTeams.filter(team =>
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (teamId: number) => {
    router.push(`/teams/${teamId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search for a team..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query && (
        <ul className="bg-white dark:bg-gray-800 border rounded mt-2">
          {filteredTeams.length === 0 && (
            <li className="p-2 text-gray-500">No teams found</li>
          )}
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