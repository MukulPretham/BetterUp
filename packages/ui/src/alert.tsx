"use client";

import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  onClose?: () => void;
}

export const Alert = ({ children, type = "info", className = "", onClose }: AlertProps) => {
  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800", 
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };

  return (
    <div className={`border rounded-lg p-4 ${typeClasses[type]} ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
