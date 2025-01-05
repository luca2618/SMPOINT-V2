import { Activity, ActivityType } from '../../types/activity';
import { httpClient } from './http.service';
import { getMembersList } from './members.service';
import { fetchActivityTypes } from '../api.service';
import { determineActivityStatus } from '../../components/admin/Status.tsx';

export const addActivity = async (data: any): Promise<void> => {
  await httpClient.post('/api/activities/', data);
};

export const getPendingActivities = async (): Promise<Activity[]> => {
  // Fetch all required data in parallel
  const [activities, members, activityTypes] = await Promise.all([
    httpClient.get<Activity[]>('/api/activities/?approved=False'),
    getMembersList(),
    fetchActivityTypes()
  ]);
  
  // Add member names and determine status for activities
  const activitiesWithDetails = activities.map(activity => ({
    ...activity,
    name: members.find(m => m.studynr === activity.studynr)?.name || 'Unknown',
    standardValue: determineActivityStatus(activity, activityTypes)
  }));

  // Sort by date in descending order
  return activitiesWithDetails.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const approvePendingActivity = async (id: number): Promise<void> => {
  const activity = await httpClient.get<Activity>(`/api/activities/${id}/`);
  await httpClient.put(`/api/activities/${id}/`, {
    ...activity,
    approved: true
  });
};

export const disapprovePendingActivity = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/activities/${id}/`);
};

export const approveAllActivities = async (): Promise<void> => {
  await httpClient.post('/api/activities/approve_all/');
};

export const disapproveAllActivities = async (): Promise<void> => {
  await httpClient.post('/api/activities/disapprove_all/');
};