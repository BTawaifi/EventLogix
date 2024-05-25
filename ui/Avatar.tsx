import React from 'react';

const gradients = [
  'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500',
  'bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500',
  'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500',
  'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600',
  'bg-gradient-to-r from-red-400 via-yellow-500 to-green-500',
  'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600',
  'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
  'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
  'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500',
  'bg-gradient-to-r from-cyan-400 via-teal-500 to-green-500',
  'bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500',
  'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700',
  'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
];

const getGradient = (name: string) => {
  const hash = name
    .split('')
    .reduce((acc: any, char: string) => acc + char.charCodeAt(0), 0);
  const index = hash % gradients.length;
  return gradients[index];
};

const Avatar = ({ name }: { name: string }) => {
  const gradient = getGradient(name);
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center ${gradient} text-white font-bold text-xs select-none`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
