import { Activity } from '../../types/activity';
import { httpClient } from './http.service';
import { getMembersList } from './members.service';

export const addActivity = async (data: any): Promise<void> => {
  await httpClient.post('/api/activities/', data);
};

export const getPendingActivities = async (): Promise<Activity[]> => {
  // Fetch both pending activities and members in parallel
  const [activities, members] = await Promise.all([
    httpClient.get<Activity[]>('/api/activities/?approved=False'),
    getMembersList()
  ]);
  
  // Add member names to activities
  const activitiesWithNames = activities.map(activity => ({
    ...activity,
    name: members.find(m => m.studynr === activity.studynr)?.name || 'Unknown'
  }));

  // Sort by date in descending order
  return activitiesWithNames.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const approvePendingActivity = async (id: number): Promise<void> => {
  // First get the activity
  const activity = await httpClient.get<Activity>(`/api/activities/${id}/`);

  // Then update it with approved status
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