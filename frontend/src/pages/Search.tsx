import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, User, Calendar, Award } from 'lucide-react';
import SearchForm from '../components/search/SearchForm';
import ActivityTable from '../components/search/ActivityTable';
import { getMembersList, getMemberActivities } from '../services/api/members.service';
import { getSetting } from '../services/api/settings.service';
import { Member } from '../types/member';
import { Activity } from '../types/activity';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [legacyActivities, setLegacyActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (studienr: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [members, activities, legacyDate] = await Promise.all([
        getMembersList(),
        getMemberActivities(studienr),
        getSetting('legacy_date')
      ]);

      const member = members.find(m => m.studynr === studienr);
      if (!member) {
        throw new Error('Member not found');
      }

      const legacyDateObj = new Date(legacyDate);
      const current = [];
      const legacy = [];

      // Split activities based on legacy date
      for (const activity of activities) {
        if (new Date(activity.date) >= legacyDateObj) {
          current.push(activity);
        } else {
          legacy.push(activity);
        }
      }
      
      setMember(member);
      setCurrentActivities(current);
      setLegacyActivities(legacy);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setMember(null);
      setCurrentActivities([]);
      setLegacyActivities([]);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getLatestActivity = () => {
    if (!currentActivities.length) return null;
    return currentActivities[0]; // Activities are already sorted by date
  };

  const latestActivity = getLatestActivity();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <SearchIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Search Members</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[350px,1fr]">
        <div className="space-y-4">
          <div className="bg-card p-6 rounded-lg">
            <SearchForm onSearch={handleSearch} />
            {error && (
              <div className="mt-4 p-4 bg-accent/10 text-accent rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : member && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Member Info Card */}
              <div className="bg-card p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Member Details</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold">{member.name}</p>
                  <p className="text-foreground/70 font-mono">{member.studynr}</p>
                  <p className="text-foreground/70">{member.email}</p>
                </div>
              </div>

              {/* Points Summary Card */}
              <div className="bg-card p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Points Summary</h3>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{member.points.toFixed(1)}</p>
                  <p className="text-foreground/70">Total Points</p>
                </div>
                <p className="text-sm text-foreground/70">
                  From {currentActivities.length + legacyActivities.length} activities
                </p>
              </div>

              {/* Latest Activity Card */}
              {latestActivity && (
                <div className="bg-card p-6 rounded-lg space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Latest Activity</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">{latestActivity.activity}</p>
                    <p className="text-primary font-semibold">+{latestActivity.points} points</p>
                    <p className="text-sm text-foreground/70">{formatDate(latestActivity.date)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Current Activities Table */}
            <div className="bg-card p-6 rounded-lg">
              <ActivityTable 
                activities={currentActivities}
                title="Current Points"
              />
            </div>

            {/* Legacy Activities Table */}
            <div className="bg-card p-6 rounded-lg">
              <ActivityTable 
                activities={legacyActivities}
                title="Legacy Points"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;