import { API_CONFIG } from '../../config/api';
import { Member } from '../../types/member';
import { Activity } from '../../types/activity';

export const getMembersList = async (): Promise<Member[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/members/`);
  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }
  return response.json();
};

export const getMemberActivities = async (studynr: string): Promise<Activity[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/`);
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  const activities: Activity[] = await response.json();
  return activities.filter(activity => activity.studynr === studynr);
};