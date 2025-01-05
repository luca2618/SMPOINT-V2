import React from 'react';
import { Activity } from '../../types/activity';
import { Check, X } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface PendingActivitiesTableProps {
  activities: Activity[];
  onApprove: (id: number) => Promise<void>;
  onDisapprove: (id: number) => Promise<void>;
  onApproveAll: () => Promise<void>;
  onDisapproveAll: () => Promise<void>;
}

const PendingActivitiesTable: React.FC<PendingActivitiesTableProps> = ({
  activities,
  onApprove,
  onDisapprove,
  onApproveAll,
  onDisapproveAll,
}) => {
  if (!activities.length) {
    return <p className="text-muted text-center py-4">No pending activities</p>;
  }

  const formatStudyNumber = (studynr: string) => {
    // Format sXXXXXX to s XXXXXX for better readability
    return studynr.replace(/^(s)(\d{6})$/i, '$1 $2');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <button
          onClick={onApproveAll}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Approve All
        </button>
        <button
          onClick={onDisapproveAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Disapprove All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-card">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Study Nr</th>
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-card/50">
                <td className="px-4 py-2 font-medium">{activity.name}</td>
                <td className="px-4 py-2 font-mono">{formatStudyNumber(activity.studynr)}</td>
                <td className="px-4 py-2">{activity.activity}</td>
                <td className="px-4 py-2">{formatDate(activity.date)}</td>
                <td className="px-4 py-2">{activity.points}</td>
                <td className="px-4 py-2 max-w-xs truncate" title={activity.comment}>
                  {activity.comment}
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={activity.standardValue} />
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onApprove(activity.id)}
                      className="p-1 text-green-500 hover:bg-green-500/20 rounded"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDisapprove(activity.id)}
                      className="p-1 text-red-500 hover:bg-red-500/20 rounded"
                      title="Disapprove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingActivitiesTable;