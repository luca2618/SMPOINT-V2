import React, { useState, useEffect } from 'react';
import PendingActivitiesTable from '../components/admin/PendingActivitiesTable';
import LegacyDateSetting from '../components/admin/LegacyDateSetting';
import { Settings } from 'lucide-react';
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

      <div className="space-y-6">
        {/* Pending Activities Section */}
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

        {/* Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LegacyDateSetting />
          
          <div className="bg-card p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Advanced Admin Panel</h2>
            </div>
            <p className="text-muted-foreground">
              Access the full Django admin interface for advanced configuration and database management.
            </p>
            <a
              href="http://localhost:8000/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open Admin Panel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;