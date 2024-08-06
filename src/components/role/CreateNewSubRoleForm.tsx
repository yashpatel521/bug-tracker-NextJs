"use client";
import React from "react";
import { Button } from "../ui/button";
import { SubRole } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { customToast } from "@/lib/utils";
import { createNewSubRole } from "@/action/role";

const CreateNewSubRoleForm = ({ roleData }: { roleData: SubRole[] }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subRoleName = formData.get("roleName");
    const roleId = formData.get("roleId");

    if (!subRoleName || !roleId) {
      customToast("Please fill all the fields", "error");
      return;
    }
    try {
      await createNewSubRole(subRoleName.toString(), +roleId);
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };
  return (
    <div className="flex flex-col md:flex-row border m-5">
      <div className="p-6 rounded-lg shadow-lg w-full ">
        <h2 className="text-2xl font-bold mb-6 text-left border-b-2 pb-2">
          Add New Sub Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-sm font-medium">
              Sub Role Name
            </label>
            <input
              type="text"
              id="roleName"
              name="roleName"
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
              placeholder="Enter role name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="selectRole"
              className="block text-sm font-medium mb-1"
            >
              Select Role
            </label>
            <Select name="roleId">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Sub Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleData.map((role, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={role.id.toString()}
                        className="capitalize"
                      >
                        {role.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Sub Role
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewSubRoleForm;
