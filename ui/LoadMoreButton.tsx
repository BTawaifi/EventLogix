import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadMoreButtonProps {
  isFetchingMore: boolean;
  loadMore: () => void;
  hasMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isFetchingMore,
  loadMore,
  hasMore,
}) => {
  return hasMore ? (
    <div className="flex justify-center">
      <button
        onClick={loadMore}
        className="w-full py-2 bg-gray-100 text-gray-600 rounded-b-lg text-sm font-bold flex items-center justify-center"
      >
        {isFetchingMore ? (
          <ClipLoader color="#4b5563" size={20} />
        ) : (
          'LOAD MORE'
        )}
      </button>
    </div>
  ) : (
    <div className="flex justify-center h-10">
      <button
        onClick={loadMore}
        disabled={true}
        className="w-full py-2 bg-gray-100 text-gray-600 rounded-b-lg text-sm font-bold flex items-center justify-center"
      ></button>
    </div>
  );
};

export default LoadMoreButton;
