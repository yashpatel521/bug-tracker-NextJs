"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ProjectDetails } from "@/types";
import { customToast, newVersionNumber } from "@/lib/utils";
import { createNewVersion } from "@/action/projects";

const CreateNewVersionForm = ({
  projectData,
}: {
  projectData: ProjectDetails;
}) => {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      await createNewVersion(formData);
      customToast("Version created successfully", "success");
    } catch (e: any) {
      customToast(e.message, "error");
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="mt-4">
      <input type="text" name="projectId" value={projectData.id} hidden />
      <div className="max-w-96">
        <div className="mb-4">
          <label htmlFor="versionNumber" className="block font-medium text-md">
            Version Name:
          </label>
          <Input
            type="text"
            id="versionNumber"
            name="versionNumber"
            className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
            placeholder="Enter version name"
            defaultValue={
              projectData.versions?.[0]?.versionNumber
                ? newVersionNumber(projectData.versions?.[0]?.versionNumber)
                : "1.0.0"
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apkFile" className="block font-medium text-md">
            Upload APK:
          </label>
          <Input
            type="file"
            id="apkFile"
            name="apkFile"
            className="w-full border rounded-md shadow-sm"
            required
            accept=".apk, .apkm"
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateNewVersionForm;
