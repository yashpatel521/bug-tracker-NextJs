const ProjectsCardSkeleton = () => {
  return (
    <div className="m-1 shadow-lg border rounded-3xl dark:shadow-none animate-pulse">
      <div className="min-h-42 min-w-64 p-4 flex flex-col items-start justify-center gap-3">
        <div className="flex">
          <div className="bg-gray-200 rounded-2xl mr-2 h-15 w-12"></div>
          <div className="text-center w-full mt-1">
            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-200 h-0.5 w-full rounded"></div>
        <div className="w-full flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-8 w-8 rounded-full"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-6 w-6 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const ProjectsCardListSkeleton = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <ProjectsCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProjectsCardListSkeleton;
