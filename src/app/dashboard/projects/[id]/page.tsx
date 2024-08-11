import { getProjectDetailsData } from "@/action/projects";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectSubDetails from "@/components/projects/ProjectSubDetails";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreadCrumbSkeleton from "@/skeletons/BreadcrumbSkeleton";
import ProjectHeaderSkeleton from "@/skeletons/ProjectHeaderSkeleton";
import React, { Suspense } from "react";
import ProjectSubDetailsSkeleton from "@/skeletons/ProjectSubDetailsSkeleton";
import ProjectChartInfo from "@/components/projects/ProjectChartInfo";
import ProjectHistoryTable from "@/components/projects/ProjectHistoryTable";
import ProjectTeamMemberTable from "@/components/projects/ProjectTeamMemberTable";
import ProjectVersionHistoryTable from "@/components/projects/ProjectVersionHistoryTable";
import ProjectBugTable from "@/components/projects/Bug/BugTable";
import BugSkeletonTable from "@/skeletons/bugSkeleton";
import { ProjectDetails } from "@/types";

const ProjectDeatilsPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    query?: string;
    currentPage?: string;
    sortBy?: string;
    sortOrder?: string;
    versionId?: string;
    view?: string;
  };
}) => {
  const projectData: ProjectDetails = await getProjectDetailsData(+params.id);
  const breadcrumbItems = [
    { title: "Projects", link: `/dashboard/projects` },
    {
      title: projectData.title || "Project Details",
      link: `/dashboard/projects/${params?.id}`,
    },
  ];
  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb items={breadcrumbItems} />
      </Suspense>
      <Separator className="mb-1" />
      <Tabs defaultValue={searchParams.view ?? "info"} className="w-full mt-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Details</TabsTrigger>
          <TabsTrigger value="bugs">Bugs</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="py-5">
            <Suspense fallback={<ProjectHeaderSkeleton />}>
              <ProjectHeader appData={projectData} />
            </Suspense>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 py-4">
              <Suspense fallback={<ProjectSubDetailsSkeleton />}>
                <ProjectSubDetails data={projectData} />
              </Suspense>
              <Suspense
                fallback={
                  <div className="bg-gray-300 w-full rounded col-span-2 animate-pulse"></div>
                }
              >
                <ProjectChartInfo stats={projectData.dailyStats ?? []} />
              </Suspense>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-4 py-4">
              <Suspense
                fallback={
                  <div className="bg-gray-300 h-44 w-full rounded animate-pulse"></div>
                }
              >
                <ProjectHistoryTable history={projectData.dailyStats ?? []} />
              </Suspense>
              <Suspense
                fallback={
                  <div className="bg-gray-300 h-44 w-full rounded animate-pulse"></div>
                }
              >
                <ProjectTeamMemberTable
                  teamMember={projectData.userProjects ?? []}
                  projectId={projectData.id}
                />
              </Suspense>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bugs">
          <Suspense
            fallback={<BugSkeletonTable />}
            key={JSON.stringify(searchParams)}
          >
            <ProjectBugTable
              projectData={projectData}
              searchParams={searchParams}
              userProjects={projectData.userProjects ?? []}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="versions">
          <ProjectVersionHistoryTable
            versions={projectData.versions ?? []}
            projectId={projectData.id}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDeatilsPage;
