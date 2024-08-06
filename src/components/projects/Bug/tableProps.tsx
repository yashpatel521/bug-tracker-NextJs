export function FeatureBadge({ s }: { s: string }) {
  const labels = [
    {
      value: "bug",
      label: "Bug",
      color: "text-red-700",
    },
    {
      value: "feature",
      label: "Feature",
      color: "text-blue-700",
    },
    {
      value: "enhancement",
      label: "Enhancement",
      color: "text-green-700",
    },
  ];

  const styles =
    "inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10";

  const label = labels.find((label) => label.value === s);
  return (
    <div className="flex align-middle justify-center items-center">
      {label && (
        <span className={`${styles} ${label.color}`}>{label.label}</span>
      )}
    </div>
  );
}

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  RocketIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export function StatusBadge({ s }: { s: string }) {
  const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: QuestionMarkCircledIcon,
      color: "text-gray-500",
    },
    {
      value: "todo",
      label: "Todo",
      icon: CircleIcon,
      color: "text-blue-500",
    },
    {
      value: "inprogress",
      label: "In Progress",
      icon: StopwatchIcon,
      color: "text-yellow-500",
    },
    {
      value: "complete",
      label: "Complete",
      icon: CheckCircledIcon,
      color: "text-green-500",
    },
    {
      value: "closed",
      label: "Closed",
      icon: CrossCircledIcon,
      color: "text-red-500",
    },
    {
      value: "new",
      label: "New",
      icon: RocketIcon,
      color: "text-purple-500",
    },
    {
      value: "assigned",
      label: "Assigned",
      icon: PersonIcon,
      color: "text-teal-500",
    },
  ];
  const status = statuses.find((status) => status.value === s);

  if (!status) {
    return null;
  }
  return (
    <div className="flex align-middle justify-center items-center">
      <status.icon
        className={`mr-2 h-4 w-4 text-muted-foreground ${status.color}`}
      />
      <span>{status.label}</span>
    </div>
  );
}

export function PriorityBadge({ s }: { s: string }) {
  const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
      color: "text-blue-500",
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
      color: "text-yellow-500",
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
      color: "text-red-500",
    },
  ];

  const priority = priorities.find((priority) => priority.value === s);

  if (!priority) {
    return null;
  }

  return (
    <div className="flex align-middle justify-center items-center">
      {priority.icon && (
        <priority.icon
          className={`mr-2 h-4 w-4 text-muted-foreground ${priority.color}`}
        />
      )}
      <span>{priority.label}</span>
    </div>
  );
}
