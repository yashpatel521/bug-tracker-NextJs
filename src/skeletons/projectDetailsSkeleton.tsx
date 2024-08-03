"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import BreadCrumbSkeleton from "@/skeletons/BreadcrumbSkeleton";
import ProjectHeaderSkeleton from "@/skeletons/ProjectHeaderSkeleton";
import AppDetailsSkeleton from "@/skeletons/AppDetailsSkeleton";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <BreadCrumbSkeleton />
      <Separator className="mb-1" />
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-4"></div>
        <div className="space-y-4">
          <div className="bg-gray-300 h-8 w-full rounded"></div>
          <div>
            <ProjectHeaderSkeleton />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 py-4">
            <div>
              <AppDetailsSkeleton />
            </div>
            <div className="bg-gray-300 w-full rounded col-span-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-300 h-44 w-full rounded"></div>
            <div className="bg-gray-300 h-44 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
