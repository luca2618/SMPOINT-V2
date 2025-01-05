import { httpClient } from './api/http.service';
import { MemberDetails } from '../types/activity';

export const searchMember = async (query: string): Promise<MemberDetails> => {
  try {
    return await httpClient.get<MemberDetails>(`/api/search/${query}`);
  } catch (error) {
    throw error;
  }
};

export const fetchMemberSuggestions = async (): Promise<{ studienr: string; navn: string; }[]> => {
  try {
    return await httpClient.get<{ studienr: string; navn: string; }[]>('/api/members/suggestions');
  } catch (error) {
    throw error;
  }
};