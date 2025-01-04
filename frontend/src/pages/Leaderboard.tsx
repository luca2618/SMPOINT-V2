import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../services/api.service';
import { Member } from '../types/member';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        // Sort members by points in descending order
        const sortedMembers = data.sort((a, b) => b.points - a.points);
        setMembers(sortedMembers);
      } catch (err) {
        setError('Failed to load leaderboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-accent bg-accent/10 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-card">
              <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Study Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
            {members.map((member, index) => (
              <tr 
                key={member.studynr}
                className={`${
                  index < 3 ? 'bg-primary/5' : ''
                } hover:bg-card/50 transition-colors`}
              >
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full
                    ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                    ${index === 1 ? 'bg-gray-300/20 text-gray-300' : ''}
                    ${index === 2 ? 'bg-amber-600/20 text-amber-600' : ''}
                    ${index > 2 ? 'bg-card text-muted' : ''}
                  `}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">{member.studynr}</td>
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4 text-right font-semibold">
                  {member.points.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;