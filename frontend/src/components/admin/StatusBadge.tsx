import React from 'react';

interface StatusBadgeProps {
  status: 'Standard' | 'No standard' | 'Wrong Standard';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Standard':
        return 'bg-green-500/20 text-green-500';
      case 'No standard':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Wrong Standard':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;