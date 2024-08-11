"use client";

import { abbreviateNumber } from "@/lib/utils";
import { DailyStats } from "@/types";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ProjectChartInfo = ({ stats }: { stats: DailyStats[] }) => {
  if (!stats.length)
    return (
      <div className="m-1 col-span-2 border py-2 rounded-xl min-h-48 flex justify-center align-middle items-center">
        <p className="text-gray-500 text-center text-lg">No data available.</p>
      </div>
    );
  return (
    <div className="m-1 col-span-2 border py-2 rounded-xl min-h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={stats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis tickFormatter={abbreviateNumber} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="installCount"
            stroke="var(--themeColor)"
            fill="#ffedad"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChartInfo;
