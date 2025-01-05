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