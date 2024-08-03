import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PinProjectsSkeleton = () => {
  return (
    <div className="m-1 animate-pulse">
      <Card className="col-span-6 md:col-span-5 shadow-2xl dark:shadow-none">
        <CardHeader>
          <CardTitle className="bg-gray-300 w-24 h-4"></CardTitle>
          <CardDescription className="bg-gray-300 w-32 h-4"></CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-20"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinProjectsSkeleton;
