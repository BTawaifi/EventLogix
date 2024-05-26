import React from 'react';

const CircleIcon = ({ isLive }: { isLive: boolean }) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="6" cx="8" cy="8" fill={isLive ? '#FF0000' : '#333c4b'} />
    </svg>
  );
};

export default CircleIcon;
