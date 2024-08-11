import CreateProjectForm from "@/components/projects/CreateProjectForm";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AddProjectPage = () => {
  const breadcrumbItems = [
    { title: "Projects", link: "/dashboard/projects" },
    { title: "Create New Project", link: "/dashboard/projects/add" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <CreateProjectForm />
    </div>
  );
};

export default AddProjectPage;
