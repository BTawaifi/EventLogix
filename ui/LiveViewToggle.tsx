import React from 'react';
import CircleIcon from './CircleIcon';

const LiveViewToggle = ({
  isLive,
  onToggle,
}: {
  isLive: boolean;
  onToggle: (isLive: boolean) => void;
}) => {
  return (
    <button
      onClick={() => onToggle(!isLive)}
      className="px-4 py-2 border border-gray-300 border-solid dark:bg-gray-700 flex rounded-r-md items-center gap-x-1 hover:bg-white m-0 text-gray-700"
      style={{ margin: 0 }}
    >
      <CircleIcon /> LIVE
    </button>
  );
};

export default LiveViewToggle;
