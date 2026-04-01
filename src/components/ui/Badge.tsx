import React, { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = "" }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
    info: 'bg-brand-50 text-brand-500',
    danger: 'bg-danger-50 text-danger-500',
  };
  return (
    <span className={`px-2 py-0.5 rounded-sm text-label-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
