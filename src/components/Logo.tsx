
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  variant = 'light',
  className = '' 
}) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const colors = {
    light: 'text-white',
    dark: 'text-brand-800',
  };

  return (
    <div className={`font-bold flex items-center ${sizes[size]} ${colors[variant]} ${className}`}>
      <div className="mr-2 bg-gradient-to-r from-brand-500 to-brand-700 p-1.5 rounded">
        <svg 
          className="w-5 h-5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
      <span>InvoiceAI</span>
    </div>
  );
};

export default Logo;
