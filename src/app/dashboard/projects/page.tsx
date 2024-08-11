import { getAllProjectData } from "@/action/projects";
import ProjectGridView from "@/components/projects/ProjectGridView";
import ProjectSearchBar from "@/components/projects/ProjectSearchBar";
import ProjectTableView from "@/components/projects/ProjectTableView";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectGridViewSkeleton from "@/skeletons/ProjectGridViewSkeleton";
import ProjectSearchBarSkeleton from "@/skeletons/ProjectSearchBarSkeleton";
import { Suspense } from "react";

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    currentPage?: string;
    view?: string;
  };
}) => {
  const breadcrumbItems = [{ title: "Projects", link: "/dashboard/projects" }];
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.currentPage) || 1;
  const projectsData = await getAllProjectData(query, currentPage);
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <Tabs defaultValue={searchParams.view ?? "gridView"} className="w-full">
        <div className="flex justify-between mb-2">
          <h2 className="text-3xl font-bold tracking-tight">All Projects</h2>
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="gridView">Grid</TabsTrigger>
            <TabsTrigger value="listView">List</TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <Suspense fallback={<ProjectSearchBarSkeleton />}>
          <ProjectSearchBar totalPages={+projectsData.totalPages} />
        </Suspense>
        <TabsContent value="gridView">
          <Suspense fallback={<ProjectGridViewSkeleton />}>
            <ProjectGridView data={projectsData.result} />
          </Suspense>
        </TabsContent>
        <TabsContent value="listView">
          <ProjectTableView data={projectsData.result} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
