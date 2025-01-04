import React from 'react';
import { Activity } from '../../types/activity';

interface ActivityTableProps {
  activities: Activity[];
  title: string;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities, title }) => {
  if (!activities?.length) {
    return (
      <div className="text-muted text-center py-4">
        No activities found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-card">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-card/50">
                <td className="px-4 py-2">{activity.id}</td>
                <td className="px-4 py-2">{activity.activity}</td>
                <td className="px-4 py-2">{activity.points}</td>
                <td className="px-4 py-2">{activity.comment}</td>
                <td className="px-4 py-2">{activity.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    activity.approved ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {activity.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;