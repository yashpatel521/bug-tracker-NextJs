import CreateBugForm from "@/components/projects/Bug/CreateBugForm";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";

const CreateNewBug = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const breadcrumbItems = [
    { title: "Projects", link: `/dashboard/projects` },
    {
      title: "Projects Deatils",
      link: `/dashboard/projects/${params.id}?view=bugs`,
    },
    {
      title: "Create New Bug",
      link: `/dashboard/projects/${params.id}/addBug`,
    },
  ];
  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator className="mb-1" />
      <CreateBugForm projectId={+params.id} />
    </div>
  );
};

export default CreateNewBug;
