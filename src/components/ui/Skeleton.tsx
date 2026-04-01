import React from 'react';

export interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`bg-gray-100 animate-pulse rounded-sm ${className}`} />
);

export default Skeleton;
