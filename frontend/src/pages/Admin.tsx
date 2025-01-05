import React, { useState, useEffect } from 'react';
import PendingActivitiesTable from '../components/admin/PendingActivitiesTable';
import { 
  getPendingActivities,
  approvePendingActivity, 
  disapprovePendingActivity, 
  approveAllActivities, 
  disapproveAllActivities 
} from '../services/api/activities.service';
import { Activity } from '../types/activity';

const Admin = () => {
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
    loadPendingActivities();
  }, []);

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
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

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
    </div>
  );
};

export default Admin;