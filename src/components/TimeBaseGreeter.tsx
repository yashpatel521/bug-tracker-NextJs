import React from "react";

const TimeBasedGreeting: React.FC = () => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return <>{greeting}</>;
};

export default TimeBasedGreeting;
