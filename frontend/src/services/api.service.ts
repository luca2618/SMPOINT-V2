import { httpClient } from './api/http.service';
import { Member } from '../types/member';
import { ActivityType } from '../types/activity';

export const fetchMembers = async (): Promise<Member[]> => {
  try {
    return await httpClient.get<Member[]>('/api/members/');
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const fetchActivityTypes = async (): Promise<ActivityType[]> => {
  try {
    return await httpClient.get<ActivityType[]>('/api/activitytypes/');
  } catch (error) {
    console.error('Error fetching activity types:', error);
    throw error;
  }
};