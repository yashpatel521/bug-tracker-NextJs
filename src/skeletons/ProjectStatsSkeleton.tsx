import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectStatsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <Card
            key={index}
            className="border rounded-xl shadow-2xl dark:shadow-none animate-pulse"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gray-300 w-24 h-4"></CardTitle>
              <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gray-300 w-16 h-6"></div>
              <p className="text-xs bg-gray-300 w-full h-4 mt-2"></p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ProjectStatsSkeleton;
