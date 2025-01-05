import { httpClient } from './http.service';
import { Member } from '../../types/member';
import { Activity } from '../../types/activity';

export const getMembersList = async (): Promise<Member[]> => {
  return await httpClient.get<Member[]>('/api/members/');
};

export const getMemberActivities = async (studynr: string): Promise<Activity[]> => {
  const activities = await httpClient.get<Activity[]>('/api/activities/');
  
  // Filter activities for the specific student and sort by date in descending order
  return activities
    .filter(activity => activity.studynr === studynr)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};