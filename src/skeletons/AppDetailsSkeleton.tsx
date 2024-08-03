import { Separator } from "@/components/ui/separator";

export default function AppDetailsSkeleton() {
  return (
    <div className="m-1 col-span-1 animate-pulse">
      <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-8"></div>
        </div>
        <Separator />
        <div className="space-y-2 mt-4">
          <div className="flex gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
