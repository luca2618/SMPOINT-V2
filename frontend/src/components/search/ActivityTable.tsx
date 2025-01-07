import React from 'react';
import { Activity } from '../../types/activity';
import { X } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

interface ActivityTableProps {
  activities: Activity[];
  title: string;
  onDelete?: (id: number) => Promise<void>;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities, title, onDelete }) => {
  const { isAuthenticated } = useAuthContext();

  if (!activities?.length) {
    return (
      <div className="text-foreground/70 text-center py-8">
        No activities found
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-foreground/20">
              <th className="px-6 py-3 text-left text-sm font-semibold">Activity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Points</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Comment</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              {isAuthenticated && <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/20">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-foreground/5 transition-colors">
                <td className="px-6 py-4 font-medium">{activity.activity}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    +{activity.points}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground/70 max-w-xs truncate" title={activity.comment}>
                  {activity.comment || '-'}
                </td>
                <td className="px-6 py-4 text-foreground/70">{formatDate(activity.date)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    activity.approved 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {activity.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                {isAuthenticated && (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDelete?.(activity.id)}
                      className="p-1 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                      title="Delete activity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;