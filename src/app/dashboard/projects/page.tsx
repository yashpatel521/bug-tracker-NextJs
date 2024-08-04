import { getProjectData } from "@/action/projects";
import ProjectGridView from "@/components/projects/ProjectGridView";
import ProjectSearchBar from "@/components/projects/ProjectSearchBar";
import ProjectTableView from "@/components/projects/ProjectTableView";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    currentPage?: string;
  };
}) => {
  const breadcrumbItems = [{ title: "Projects", link: "/dashboard/projects" }];
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.currentPage) || 1;
  const projectsData = await getProjectData(query, currentPage);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <Tabs defaultValue="listView" className="w-full">
        <div className="flex justify-between mb-2">
          <h2 className="text-3xl font-bold tracking-tight">All Projects</h2>
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="gridView">Grid</TabsTrigger>
            <TabsTrigger value="listView">List</TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <ProjectSearchBar totalPages={+projectsData.totalPages} />
        <TabsContent value="gridView">
          <ProjectGridView data={projectsData.result} />
        </TabsContent>
        <TabsContent value="listView">
          <ProjectTableView data={projectsData.result} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
