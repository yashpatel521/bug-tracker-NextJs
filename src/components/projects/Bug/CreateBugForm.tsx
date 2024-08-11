"use client";
import React, { useEffect, useState } from "react";
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
import {
  bugPriorityArray,
  bugStatusArray,
  bugTypeArray,
  User,
  UserProject,
  Version,
} from "@/types";
import MultiSelect from "./multiSelect";
import { getVersions, memberInProject } from "@/action/projects";
import { customToast } from "@/lib/utils";
import { createBug } from "@/action/bug";

const CreateBugForm = ({ projectId }: { projectId: number }) => {
  const [bugData, setBugData] = useState<{
    title: string;
    description: string;
    assignedTo: User[];
    priority: string;
    status: string;
    type: string;
    file: File | null;
    versionId: number;
  }>({
    title: "",
    description: "",
    assignedTo: [],
    priority: "medium",
    status: "new",
    type: "bug",
    file: null,
    versionId: 0,
  });

  const [memberInProjectData, setMemberInProjectData] =
    useState<UserProject[]>();
  const [versionList, setVersionList] = useState<Version[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const memberInProjectData = await memberInProject(projectId);
      setMemberInProjectData(memberInProjectData);

      const getVersionsData = await getVersions(projectId);
      setVersionList(getVersionsData);
    };
    fetchData();
  }, []);
  const handleUserSelect = (selectedUsers: User[]) => {
    setBugData({ ...bugData, assignedTo: selectedUsers });
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setBugData({ ...bugData, file });
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", bugData.title);
    formData.append("description", bugData.description);
    formData.append("priority", bugData.priority);
    formData.append("status", bugData.status);
    formData.append("type", bugData.type);
    formData.append("projectId", projectId.toString());
    formData.append("versionId", bugData.versionId.toString());
    formData.append("assignedTo", JSON.stringify(bugData.assignedTo));
    if (bugData.file) {
      formData.append("file", bugData.file);
    }
    try {
      await createBug(formData);
      customToast("Bug created successfully", "success");
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-left border-b-2 pb-2">
          Add New Bug
        </h2>
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
              required
              onChange={(e) =>
                setBugData({ ...bugData, title: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block font-medium text-md">
              Priority:
            </label>
            <Select
              name="priority"
              defaultValue="medium"
              onValueChange={(value) =>
                setBugData({ ...bugData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bugPriorityArray.map((priority) => (
                    <SelectItem
                      key={priority.value}
                      className="capitalize"
                      value={priority.value}
                    >
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block font-medium text-md">
              Type:
            </label>
            <Select
              name="type"
              defaultValue="bug"
              onValueChange={(value) => setBugData({ ...bugData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bugTypeArray.map((type) => (
                    <SelectItem
                      key={type.value}
                      className="capitalize"
                      value={type.value}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label htmlFor="appType" className="block font-medium text-md">
              Status:
            </label>
            <Select
              name="status"
              defaultValue="new"
              onValueChange={(value) =>
                setBugData({ ...bugData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bugStatusArray.map((status) => (
                    <SelectItem
                      key={status.value}
                      className="capitalize"
                      value={status.value}
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="appType" className="block font-medium text-md">
              Version:
            </label>
            <Select
              name="status"
              onValueChange={(value) =>
                setBugData({ ...bugData, versionId: +value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Version" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {versionList.map((version) => (
                    <SelectItem
                      key={version.id}
                      className="capitalize"
                      value={version.id.toString()}
                    >
                      {version.versionNumber}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block font-medium text-md">
              Images:
            </label>
            <Input
              type="file"
              id="images"
              name="images"
              placeholder="Upload app icon"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block font-medium text-md">
              Assign To:
            </label>
            {memberInProjectData && (
              <MultiSelect
                users={memberInProjectData.map((i) => i.user)}
                selectedUsers={[]}
                onChange={handleUserSelect}
              />
            )}
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="description" className="block font-medium text-md">
              Description:
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter project description"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Add Bug
        </Button>
      </div>
    </div>
  );
};

export default CreateBugForm;
