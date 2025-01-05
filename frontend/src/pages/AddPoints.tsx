import React, { useState, useEffect } from 'react';
import AddPointForm from '../components/forms/AddPointForm';
import { fetchActivityTypes, fetchMembers } from '../services/api.service';
import { addActivity } from '../services/api/activities.service';
import { ActivityType } from '../types/activity';
import { Member } from '../types/member';

const AddPoints = () => {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [typesData, membersData] = await Promise.all([
          fetchActivityTypes(),
          fetchMembers()
        ]);
        setActivityTypes(typesData);
        setMembers(membersData);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await addActivity(data);
      // Show success message or clear form
    } catch (err) {
      setError('Failed to add activity');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <AddPointForm
        activityTypes={activityTypes}
        members={members}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddPoints;