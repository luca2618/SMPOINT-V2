import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import SearchForm from '../components/search/SearchForm';
import ActivityTable from '../components/search/ActivityTable';
import { getMembersList, getMemberActivities } from '../services/api/members.service';
import { Member } from '../types/member';
import { Activity } from '../types/activity';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (studienr: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const members = await getMembersList();
      const member = members.find(m => m.studynr === studienr);
      if (!member) {
        throw new Error('Member not found');
      }
      
      const activities = await getMemberActivities(studienr);
      setMember(member);
      setActivities(activities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setMember(null);
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search from URL params
  useEffect(() => {
    const studynr = searchParams.get('studynr');
    if (studynr) {
      handleSearch(studynr);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <SearchIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Search Members</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
        <div className="space-y-4">
          <SearchForm onSearch={handleSearch} />
          {error && (
            <div className="p-4 bg-accent/10 text-accent rounded-lg">
              {error}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : member && (
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg space-y-2">
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-muted">Study Number: {member.studynr}</p>
              <p className="text-lg">Total Points: {member.points}</p>
            </div>

            <ActivityTable 
              activities={activities}
              title="Activities"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;