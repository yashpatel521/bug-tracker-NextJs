import ImageViewer from "@/components/ui/imageViewer";
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
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const BugDetailsForm = ({
  bugData,
  userProjects,
}: {
  bugData: Bug;
  userProjects: UserProject[];
}) => {
  const [updatedData, setUpdatedData] = useState({
    title: bugData.title,
    description: bugData.description,
    assignedTo: bugData.assignedTo,
    priority: bugData.priority,
    status: bugData.status,
    type: bugData.type,
    images: bugData.images.map((i) => i.src),
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
  //   console.log(bugData);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUpdatedData({
        ...updatedData,
        images: updatedData.images.concat(newImages),
      });
    }
  };
  const handleUserSelect = (selectedUsers: User[]) => {
    setUpdatedData({ ...updatedData, assignedTo: selectedUsers });
  };
  console.log(updatedData);

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
      <Label className="block text-sm font-medium mt-3">Attachments</Label>
      <div className="mt-1 ml-2">
        <Input
          type="file"
          placeholder="Attachments"
          multiple
          onChange={onImageUpload}
        />
        <ImageViewer images={updatedData.images} />
      </div>
      <SheetFooter className="flex justify-end border-t mt-4 pt-4">
        <SheetClose asChild>
          <Button
            type="button"
            variant="ghost"
            className="border"
            //   onClick={handleUpdateBug}
          >
            Update Bug
          </Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
};

export default BugDetailsForm;
