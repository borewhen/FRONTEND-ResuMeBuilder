import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-dip-100 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-4 h-4 bg-dip-100 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-4 h-4 bg-dip-100 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
