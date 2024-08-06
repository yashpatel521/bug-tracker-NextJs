import { getProjectDetailsData } from "@/action/projects";
import CreateNewVersionForm from "@/components/projects/CreateNewVersionForm";
import ProjectHeader from "@/components/projects/ProjectHeader";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import ProjectHeaderSkeleton from "@/skeletons/ProjectHeaderSkeleton";
import React, { Suspense } from "react";

const CreateNewVersionPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const breadcrumbItems = [
    { title: "Projects", link: `/dashboard/projects` },
    {
      title: "Project Details",
      link: `/dashboard/projects/${params?.id}`,
    },
    {
      title: "Add New Version",
      link: `/dashboard/projects/${params?.id}/addVersion`,
    },
  ];
  const projectData = await getProjectDetailsData(+params.id);

  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator className="mb-2" />
      <Suspense fallback={<ProjectHeaderSkeleton />}>
        <ProjectHeader appData={projectData} />
      </Suspense>
      <CreateNewVersionForm projectData={projectData} />
    </div>
  );
};

export default CreateNewVersionPage;
