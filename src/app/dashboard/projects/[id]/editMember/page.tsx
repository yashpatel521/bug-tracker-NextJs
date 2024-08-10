import { getProjectDetailsData } from "@/action/projects";
import { getAllUser } from "@/action/user";
import ProjectMemberTable from "@/components/projects/ProjectMemberTable";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import BreadCrumbSkeleton from "@/skeletons/BreadcrumbSkeleton";
import { ProjectDetails } from "@/types";
import React, { Suspense } from "react";

const EditMemberPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams?: {
    query?: string;
    currentPage?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) => {
  const projectData: ProjectDetails = await getProjectDetailsData(+params.id);
  const allUser = await getAllUser(
    searchParams?.currentPage || "1",
    searchParams?.query || "",
    searchParams?.sortBy || "createdAt",
    searchParams?.sortOrder || "desc"
  );
  const breadcrumbItems = [
    { title: "Projects", link: `/dashboard/projects` },
    {
      title: projectData.title || "Project Details",
      link: `/dashboard/projects/${params?.id}`,
    },
    {
      title: "Edit Project Members",
      link: `/dashboard/projects/${params?.id}/editMember`,
    },
  ];
  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb items={breadcrumbItems} />
      </Suspense>
      <Separator className="mb-1" />
      <ProjectMemberTable projectData={projectData} allUser={allUser} />
    </div>
  );
};

export default EditMemberPage;
