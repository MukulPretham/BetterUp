"use client";

import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loading = ({ children, size = "md", className = "" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
      {children && <span className="ml-2">{children}</span>}
    </div>
  );
};
