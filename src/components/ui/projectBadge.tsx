import React from "react";

const statusStyles: { [key: string]: { text: string; style: string } } = {
  complete: { text: "Complete", style: "text-green-600 border-green-600" },
  inprogress: { text: "In Progress", style: "text-blue-600 border-blue-600" },
  onhold: { text: "On Hold", style: "text-yellow-600 border-yellow-600" },
  inreview: { text: "In Review", style: "text-purple-600 border-purple-600" },
  default: { text: "Unknown", style: "text-gray-600 border-gray-600" },
};

const ProjectBadge = ({
  status,
  bordered = true,
}: {
  status: string;
  bordered?: boolean;
}) => {
  const statusData = statusStyles[status] || statusStyles["default"];
  const borderClass = bordered ? "border" : "";

  return (
    <div
      className={`text-sm ml-auto font-medium px-2 rounded-md ${borderClass} ${statusData.style}`}
    >
      {statusData.text}
    </div>
  );
};

export default ProjectBadge;
