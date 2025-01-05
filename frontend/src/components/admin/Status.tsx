import { Activity, ActivityType } from '../types/activity';

export type ActivityStatus = 'Standard' | 'No standard' | 'Wrong Standard';

export const determineActivityStatus = (
  activity: Pick<Activity, 'activity' | 'points'>,
  activityTypes: ActivityType[]
): ActivityStatus => {
  // Find matching activity type by name
  const matchingType = activityTypes.find(
    type => type.activity.toLowerCase() === activity.activity.toLowerCase()
  );

  if (!matchingType) {
    return 'No standard';
  }

  // Check if points match
  return matchingType.points === activity.points ? 'Standard' : 'Wrong Standard';
};