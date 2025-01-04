export interface Activity {
  id: number;
  studynr: string;
  activity: string;
  points: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface MemberDetails {
  member: Member;
  activities: Activity[];
}