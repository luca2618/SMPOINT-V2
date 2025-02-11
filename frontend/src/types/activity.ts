export interface Activity {
  id: number;
  studynr: string;
  name: string;
  activity: string;
  points: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface ActivityType {
  id: number;
  activity: string;
  points: number;
  description: string;
}

export interface MemberDetails {
  member: Member;
  activities: Activity[];
}