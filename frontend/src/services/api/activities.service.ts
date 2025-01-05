import { API_CONFIG } from '../../config/api';
import { Activity } from '../../types/activity';
import { AuthService } from '../auth.service';
import { getMembersList } from './members.service';

const getAuthHeaders = () => {
  const tokens = AuthService.getStoredTokens();
  return tokens ? {
    'Authorization': `Bearer ${tokens.access}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };
};

export const addActivity = async (data: any): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add activity');
  }
};

export const getPendingActivities = async (): Promise<Activity[]> => {
  // Fetch both pending activities and members in parallel
  const [activitiesResponse, members] = await Promise.all([
    fetch(`${API_CONFIG.BASE_URL}/api/activities/?approved=False`, {
      headers: getAuthHeaders(),
    }),
    getMembersList()
  ]);

  if (!activitiesResponse.ok) {
    throw new Error('Failed to fetch pending activities');
  }

  const activities: Activity[] = await activitiesResponse.json();
  
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
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/${id}/`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activity');
  }

  const activity = await response.json();

  // Then update it with approved status
  const updateResponse = await fetch(`${API_CONFIG.BASE_URL}/api/activities/${id}/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      ...activity,
      approved: true
    }),
  });

  if (!updateResponse.ok) {
    throw new Error('Failed to approve activity');
  }
};

export const disapprovePendingActivity = async (id: number): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to disapprove activity');
  }
};

export const approveAllActivities = async (): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/approve_all/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to approve all activities');
  }
};

export const disapproveAllActivities = async (): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/disapprove_all/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to disapprove all activities');
  }
};