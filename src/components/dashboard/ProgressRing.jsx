import React from 'react';

export default function ProgressRing({ progress = 42, size = 120 }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <div className="neumorphic-card p-6 flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
              className="opacity-30"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {progress}%
            </span>
            <span className="text-sm text-gray-500 mt-1">Complete</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-gray-800">Onboarding Progress</h3>
          <p className="text-sm text-gray-500 mt-1">
            {progress < 30 ? "Just getting started!" : 
             progress < 70 ? "Making great progress!" : 
             progress < 100 ? "Almost there!" : "Welcome aboard! 🎉"}
          </p>
        </div>
      </div>
    </div>
  );
}