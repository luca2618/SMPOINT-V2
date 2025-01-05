import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import AddPointForm from '../components/forms/AddPointForm';
import PendingActivitiesTable from '../components/admin/PendingActivitiesTable';
import { fetchActivityTypes, fetchMembers } from '../services/api.service';
import { 
  addActivity, 
  getPendingActivities,
  approvePendingActivity, 
  disapprovePendingActivity, 
  approveAllActivities, 
  disapproveAllActivities 
} from '../services/api/activities.service';
import { ActivityType, Activity } from '../types/activity';
import { Member } from '../types/member';

const AddPoints = () => {
  const { isAuthenticated } = useAuthContext();
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadPendingActivities = async () => {
    try {
      const activities = await getPendingActivities();
      setPendingActivities(activities);
    } catch (err) {
      setError('Failed to load pending activities');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [typesData, membersData] = await Promise.all([
          fetchActivityTypes(),
          fetchMembers()
        ]);
        setActivityTypes(typesData);
        setMembers(membersData);
        
        if (isAuthenticated) {
          await loadPendingActivities();
        }
      } catch (err) {
        setError('Failed to load data');
      }
    };
    loadData();
  }, [isAuthenticated]);

  const handleSubmit = async (data: any) => {
    try {
      await addActivity(data);
      if (isAuthenticated) {
        await loadPendingActivities();
      }
    } catch (err) {
      setError('Failed to add activity');
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approvePendingActivity(id);
      await loadPendingActivities();
    } catch (err) {
      setError('Failed to approve activity');
    }
  };

  const handleDisapprove = async (id: number) => {
    try {
      await disapprovePendingActivity(id);
      await loadPendingActivities();
    } catch (err) {
      setError('Failed to disapprove activity');
    }
  };

  const handleApproveAll = async () => {
    try {
      await approveAllActivities();
      setPendingActivities([]);
    } catch (err) {
      setError('Failed to approve all activities');
    }
  };

  const handleDisapproveAll = async () => {
    try {
      await disapproveAllActivities();
      setPendingActivities([]);
    } catch (err) {
      setError('Failed to disapprove all activities');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <AddPointForm
          activityTypes={activityTypes}
          members={members}
          onSubmit={handleSubmit}
        />

        {isAuthenticated && (
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Pending Activities</h2>
            <PendingActivitiesTable
              activities={pendingActivities}
              onApprove={handleApprove}
              onDisapprove={handleDisapprove}
              onApproveAll={handleApproveAll}
              onDisapproveAll={handleDisapproveAll}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPoints;