import React from "react";
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-6 h-6">
        <div className="hexagon animate-honeycomb delay-100 left-[-28px] top-0"></div>
        <div className="hexagon animate-honeycomb delay-200 left-[-14px] top-[22px]"></div>
        <div className="hexagon animate-honeycomb delay-300 left-[14px] top-[22px]"></div>
        <div className="hexagon animate-honeycomb delay-400 left-[28px] top-0"></div>
        <div className="hexagon animate-honeycomb delay-500 left-[14px] top-[-22px]"></div>
        <div className="hexagon animate-honeycomb delay-600 left-[-14px] top-[-22px]"></div>
        <div className="hexagon animate-honeycomb delay-700 left-0 top-0"></div>
      </div>
    </div>
  );
};

export default Loading;
