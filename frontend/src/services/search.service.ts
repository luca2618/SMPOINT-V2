import { API_CONFIG } from '../config/api';
import { MemberDetails } from '../types/activity';

export const searchMember = async (query: string): Promise<MemberDetails> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/search/${query}`);
    if (!response.ok) {
      throw new Error('Member not found');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchMemberSuggestions = async (): Promise<{ studienr: string; navn: string; }[]> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/members/suggestions`);
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};