import { getProjectDetailsData } from "@/action/projects";
import EditProjectForm from "@/components/projects/EditProjectForm";
import ProjectHeader from "@/components/projects/ProjectHeader";
import TogglePinProjectButton from "@/components/TogglePinProjectButton";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { ProjectDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EditProjectPage = async ({
  params,
}: {
  params: {
    id: string;
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
  const StarIcon = Icons["Star"];
  const PlayStoreIcon = Icons["PlayStore"];
  return (
    <div className="flex-1 p-3 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator className="mb-2" />
      <div className="rounded-2xl shadow-lg">
        <div className="flex px-5 justify-between">
          <div className="flex items-center">
            <Image
              src={projectData.appIcon}
              alt={projectData.title}
              width={80}
              height={80}
              className="rounded-lg max-w-[80px] max-h-[80px] shadow-2xl dark:shadow-2xl dark:shadow-slate-600"
              unoptimized={true}
            />
            <div className="max-w-2xl mt-2 ml-5">
              <p className="text-lg text-gray-400 flex items-center gap-5">
                {projectData.developer}
                <Link
                  href={projectData.appUrl}
                  className="mr-2"
                  target="_blank"
                >
                  <PlayStoreIcon />
                </Link>
              </p>
              <p className="text-sm mb-4 text-gray-400 ">{projectData.appId}</p>
            </div>
          </div>
        </div>
      </div>
      <EditProjectForm projectData={projectData} />
    </div>
  );
};

export default EditProjectPage;
