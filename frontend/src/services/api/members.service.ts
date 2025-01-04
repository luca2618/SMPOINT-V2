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
  
  // Filter activities for the specific student and sort by date in descending order
  return activities
    .filter(activity => activity.studynr === studynr)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};