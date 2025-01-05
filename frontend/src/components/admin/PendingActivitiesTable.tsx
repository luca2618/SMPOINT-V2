import React from 'react';
import { Activity } from '../../types/activity';
import { Check, X } from 'lucide-react';

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
                <td className="px-4 py-2 text-muted">{activity.studynr}</td>
                <td className="px-4 py-2">{activity.activity}</td>
                <td className="px-4 py-2">{new Date(activity.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{activity.points}</td>
                <td className="px-4 py-2">{activity.comment}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    activity.standardValue === 'Standard' 
                      ? 'bg-green-500/20 text-green-500'
                      : activity.standardValue === 'No standard'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {activity.standardValue}
                  </span>
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