import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Left Green Symbol */}
      <path
        d="M 6 12 L 42 17 V 83 L 6 88 V 72 L 23 64 V 36 L 6 28 Z"
        fill="#3F8E3D"
      />
      {/* Right Orange Symbol */}
      <path
        d="M 94 12 L 58 17 V 83 L 94 88 V 72 L 77 64 V 36 L 94 28 Z"
        fill="#E76228"
      />
    </svg>
  );
};

