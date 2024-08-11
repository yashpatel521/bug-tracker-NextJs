import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Bug,
  bugPriorityArray,
  bugStatusArray,
  bugTypeArray,
  User,
  UserProject,
} from "@/types";
import React, { useState } from "react";
import MultiSelect from "./multiSelect";
import { Button } from "@/components/ui/button";
import { updateBug } from "@/action/bug";
import BugImageHandle from "./BugImageHandle";
import { customToast } from "@/lib/utils";

const BugDetailsForm = ({
  bugData,
  userProjects,
}: {
  bugData: Bug;
  userProjects: UserProject[];
}) => {
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState<{
    id: number;
    title: string;
    description: string;
    assignedTo: User[];
    priority: string;
    status: string;
    type: string;
  }>({
    id: bugData.id,
    title: bugData.title,
    description: bugData.description,
    assignedTo: bugData.assignedTo,
    priority: bugData.priority,
    status: bugData.status,
    type: bugData.type,
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUpdatedData({
      ...updatedData,
      [name]: value as any,
    });
  };

  const handleUserSelect = (selectedUsers: User[]) => {
    setUpdatedData({ ...updatedData, assignedTo: selectedUsers });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", updatedData.id.toString());
    formData.append("title", updatedData.title);
    formData.append("description", updatedData.description);
    formData.append("priority", updatedData.priority);
    formData.append("status", updatedData.status);
    formData.append("type", updatedData.type);
    formData.append("assignedTo", JSON.stringify(updatedData.assignedTo));
    try {
      await updateBug(formData);
      customToast("Bug updated successfully", "success");
    } catch (error: any) {
      customToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 mb-4">
      <Label className="block text-sm font-medium">Title</Label>
      <div className="flex items-center mt-1 mb-2 ml-2">
        <Input
          type="text"
          name="title"
          className="flex-grow"
          defaultValue={updatedData.title}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <Label className="block text-sm font-medium mt-3">Description</Label>
      <div className="flex items-center mt-1 ml-2">
        <Textarea
          name="description"
          defaultValue={updatedData.description}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <Label className="block text-sm font-medium mt-3">Assign To</Label>
      <div className="mt-1 ml-2">
        <MultiSelect
          users={userProjects.map((i) => i.user)}
          selectedUsers={updatedData.assignedTo}
          onChange={handleUserSelect}
        />
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-4">
        <div>
          <Label className="block text-sm font-medium">Priority</Label>
          <div className="mt-1 ml-2">
            <Select
              name="priority"
              defaultValue={updatedData.priority}
              onValueChange={(value) => handleSelectChange("priority", value)}
            >
              <SelectTrigger className="w-[180px]">
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
        </div>
        <div>
          <Label className="block text-sm font-medium">Feature</Label>
          <div className="mt-1 ml-2">
            <Select
              name="type"
              defaultValue={updatedData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="w-[180px]">
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
        </div>
        <div>
          <Label className="block text-sm font-medium">Status</Label>
          <div className="mt-1 ml-2">
            <Select
              name="status"
              defaultValue={updatedData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-[180px]">
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
        </div>
      </div>
      <BugImageHandle bugData={bugData} />
      <Button
        type="button"
        variant="ghost"
        className="border mt-5 bg-teal-400"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default BugDetailsForm;
