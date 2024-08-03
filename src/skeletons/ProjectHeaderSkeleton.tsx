import React from "react";

const ProjectHeaderSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-lg animate-pulse">
      <div className="flex flex-col sm:flex-row px-5 justify-between">
        <div className="flex flex-col sm:flex-row items-center">
          {/* Image Placeholder */}
          <div className="rounded-lg max-w-[80px] max-h-[80px] bg-gray-300 mx-auto sm:mx-0"></div>
          <div className="max-w-2xl mt-2 ml-5 flex">
            <div className="h-20 w-20 bg-gray-300 rounded mr-2"></div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="h-6 bg-gray-300 w-48 rounded"></div>
                <div className="h-6 bg-gray-300 w-6 rounded"></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="h-6 bg-gray-300 w-40 rounded"></div>
                <div className="h-6 bg-gray-300 w-6 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            {/* Rating Placeholder */}
            <div className="flex flex-col gap-1 text-[14px] justify-center items-center ">
              <div className="h-4 bg-gray-300 w-12 rounded"></div>
              <div className="h-4 bg-gray-300 w-24 rounded mt-1"></div>
            </div>
            {/* Reviews Placeholder */}
            <div className="flex flex-col gap-1 text-[14px] justify-center items-center ">
              <div className="h-4 bg-gray-300 w-12 rounded"></div>
              <div className="h-4 bg-gray-300 w-24 rounded mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeaderSkeleton;
