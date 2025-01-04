import React, { useState } from 'react';
import { ActivityType } from '../../types/activity';
import FormInput from './inputs/FormInput';
import DatalistInput from './inputs/DatalistInput';

interface AddPointFormProps {
  activityTypes: ActivityType[];
  members: { studynr: string; name: string; }[];
  onSubmit: (data: any) => Promise<void>;
}

const AddPointForm: React.FC<AddPointFormProps> = ({ activityTypes, members, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    studynr: '',
    date: new Date().toISOString().split('T')[0],
    activity: '',
    comment: '',
    points: '',
  });

  const handleActivityChange = (activity: string) => {
    const selectedActivity = activityTypes.find(type => type.activity === activity);
    if (selectedActivity) {
      setFormData(prev => ({
        ...prev,
        activity,
        points: selectedActivity.points.toString(),
        comment: selectedActivity.description || '',
      }));
    }
  };

  const handleNameChange = (name: string) => {
    const member = members.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (member) {
      setFormData(prev => ({
        ...prev,
        name,
        studynr: member.studynr,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        name,
      }));
    }
  };

  const handleStudyNrChange = (studynr: string) => {
    const member = members.find(m => m.studynr === studynr);
    if (member) {
      setFormData(prev => ({
        ...prev,
        name: member.name,
        studynr,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        studynr,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(prev => ({
      ...prev,
      name: '',
      studynr: '',
      activity: '',
      comment: '',
      points: '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Points</h2>

      <div className="space-y-4">
        <DatalistInput
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          options={members.map(m => ({ id: m.studynr, value: m.name }))}
          placeholder="Select or enter name"
        />

        <DatalistInput
          id="studynr"
          label="Study Number"
          value={formData.studynr}
          onChange={(e) => handleStudyNrChange(e.target.value)}
          options={members.map(m => ({ id: m.studynr, value: m.studynr }))}
          placeholder="Enter study number"
          required
        />

        <FormInput
          id="date"
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />

        <DatalistInput
          id="activity"
          label="Activity"
          value={formData.activity}
          onChange={(e) => handleActivityChange(e.target.value)}
          options={activityTypes.map(t => ({ id: t.id.toString(), value: t.activity }))}
          placeholder="Select activity"
          required
        />

        <FormInput
          id="comment"
          type="text"
          label="Comment"
          value={formData.comment}
          onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          placeholder="Enter comment"
        />

        <FormInput
          id="points"
          type="number"
          step="0.1"
          label="Points"
          value={formData.points}
          onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
          placeholder="Enter points"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPointForm;