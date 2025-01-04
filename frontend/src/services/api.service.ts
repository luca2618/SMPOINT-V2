import { API_CONFIG } from '../config/api';
import { Member } from '../types/member';
import { AuthService } from './auth.service';

export const fetchMembers = async (): Promise<Member[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/members/`);
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};