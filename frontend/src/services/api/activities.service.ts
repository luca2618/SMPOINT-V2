import { API_CONFIG } from '../../config/api';
import { Activity } from '../../types/activity';
import { AuthService } from '../auth.service';

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
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/?approved=False&include_names=true`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pending activities');
  }

  const activities = await response.json();
  return activities.sort((a: Activity, b: Activity) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const approvePendingActivity = async (id: number): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/${id}/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ approved: true }),
  });

  if (!response.ok) {
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
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/approve-all/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to approve all activities');
  }
};

export const disapproveAllActivities = async (): Promise<void> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/api/activities/disapprove-all/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to disapprove all activities');
  }
};