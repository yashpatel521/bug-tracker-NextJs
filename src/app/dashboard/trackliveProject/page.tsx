import { searchApp, suggest } from "@/action/liveProject";
import LiveTrackProjectHeader from "@/components/liveTrackProject/LiveTrackProjectHeader";
import TopAppTable from "@/components/liveTrackProject/topAppTable";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import TopAppTableSkeleton from "@/skeletons/TopAppTableSkeleton";
import { ProjectDetails } from "@/types";
import { Suspense } from "react";

const TrackLiveProjectPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const breadcrumbItems = [
    { title: "Live Project Track", link: "/dashboard/trackliveProject" },
  ];
  let suggestedData: ProjectDetails[] = await suggest();
  if (searchParams.query) {
    suggestedData = await searchApp(searchParams.query);
  }
  return (
    <div className="space-y-4 p-4 pt-6 md:p-8 ">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <LiveTrackProjectHeader />
      <Suspense
        fallback={<TopAppTableSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <TopAppTable suggestedData={suggestedData} />
      </Suspense>
    </div>
  );
};

export default TrackLiveProjectPage;
