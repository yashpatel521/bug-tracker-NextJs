import { ProjectDetails } from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/action/projects";

const EditProjectForm = ({ projectData }: { projectData: ProjectDetails }) => {
  return (
    <div className="flex flex-col">
      <div className="p-6 rounded-lg shadow-lg w-full">
        <form action={updateProject}>
          <Input type="hidden" name="id" defaultValue={projectData.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium text-md">
                Title:
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                defaultValue={projectData.title}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="appId" className="block font-medium text-md">
                App ID:
              </label>
              <Input
                type="text"
                id="appId"
                name="appId"
                placeholder="Enter app ID"
                defaultValue={projectData.appId}
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="developerId"
                className="block font-medium text-md"
              >
                Developer ID:
              </label>
              <Input
                type="text"
                id="developerId"
                name="developerId"
                placeholder="Enter developer ID"
                defaultValue={projectData.developerId}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="repositoryUrl"
                className="block font-medium text-md"
              >
                Repository URL:
              </label>
              <Input
                type="text"
                id="repositoryUrl"
                name="repositoryUrl"
                placeholder="Enter repository URL"
                defaultValue={projectData.repositoryUrl}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="firebaseAccount"
                className="block font-medium text-md"
              >
                Firebase Account:
              </label>
              <Input
                type="text"
                id="firebaseAccount"
                name="firebaseAccount"
                placeholder="Enter firebase account"
                defaultValue={projectData.firebaseAccount}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="developer" className="block font-medium text-md">
                Developer:
              </label>
              <Input
                type="text"
                id="developer"
                name="developer"
                placeholder="Enter Developer"
                defaultValue={projectData.developer}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="developerEmail"
                className="block font-medium text-md"
              >
                Developer Email:
              </label>
              <Input
                type="text"
                id="developerEmail"
                name="developerEmail"
                placeholder="Enter Developer Email"
                defaultValue={projectData.developerEmail}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="appUrl" className="block font-medium text-md">
                App Url:
              </label>
              <Input
                type="text"
                id="appUrl"
                name="appUrl"
                placeholder="Enter App Url"
                defaultValue={projectData.appUrl}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="privacyPolicyUrl"
                className="block font-medium text-md"
              >
                Privacy Policy Url:
              </label>
              <Input
                type="text"
                id="privacyPolicyUrl"
                name="privacyPolicyUrl"
                placeholder="Enter App Url"
                defaultValue={projectData.privacyPolicyUrl}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block font-medium text-md">
                Status:
              </label>
              <Select name="status" defaultValue={projectData.status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="complete" className="capitalize">
                      Complete
                    </SelectItem>
                    <SelectItem value="inprogress" className="capitalize">
                      In Progress
                    </SelectItem>
                    <SelectItem value="onhold" className="capitalize">
                      On Hold
                    </SelectItem>
                    <SelectItem value="inreview" className="capitalize">
                      In Review
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="appType" className="block font-medium text-md">
                App Type:
              </label>
              <Select name="appType" defaultValue={projectData.appType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="google" className="capitalize">
                      Google
                    </SelectItem>
                    <SelectItem value="apple" className="capitalize">
                      Apple
                    </SelectItem>
                    <SelectItem value="web" className="capitalize">
                      Web
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="appIcon" className="block font-medium text-md">
                App Icon:
              </label>
              <Input
                type="file"
                id="appIcon"
                name="appIcon"
                placeholder="Upload app icon"
                accept="image/*"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="description"
                className="block font-medium text-md"
              >
                Description:
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter project description"
                defaultValue={projectData.description}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="description"
                className="block font-medium text-md"
              >
                Description Html:
              </label>
              <Textarea
                id="descriptionHTML"
                name="descriptionHTML"
                placeholder="Enter project description Html"
                defaultValue={projectData.descriptionHTML}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Update Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectForm;
