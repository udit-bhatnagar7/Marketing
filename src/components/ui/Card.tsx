import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

export default Card;
