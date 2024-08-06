"use client";
import React from "react";
import { Button } from "../ui/button";
import { createNewRole } from "@/action/role";
import { customToast } from "@/lib/utils";

const CreateNewRoleForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await createNewRole(formData.get("roleName") as string);
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };
  return (
    <div className="flex flex-col md:flex-row border m-5">
      <div className="p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-left border-b-2 pb-2">
          Add New Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-sm font-medium">
              Role Name
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
          <Button
            type="submit"
            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Role
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewRoleForm;
