"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/ui/icons";
import { Role, SubRole } from "@/types";
import { Input } from "../ui/input";
import { createNewUser } from "@/action/user";
import { generateRandomPassword } from "@/lib/utils";
const CreateUserForm = ({
  roles,
  subRoles,
}: {
  roles: Role[];
  subRoles: SubRole[];
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const [role, setRole] = useState<number>();
  const [subRole, setSubRole] = useState<number>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    setSuccessMessage("");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await createNewUser(formData);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const EyeIcon = Icons["Eye"];
  const ClosedEyeIcon = Icons["ClosedEye"];
  return (
    <div>
      <div className="flex flex-col border m-5">
        <div className="p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-left border-b-2 pb-2">
            Add New User
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block font-medium text-md"
                >
                  First Name :
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block font-medium text-md">
                  Last Name :
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-md">
                  Email :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium text-md">
                  Password :
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
                    placeholder="Enter password"
                    defaultValue={generateRandomPassword()}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 px-3 py-1 text-sm leading-5"
                  >
                    {passwordVisible ? <ClosedEyeIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block font-medium text-md">
                  Role :
                </label>
                <Select
                  name="roleId"
                  onValueChange={(e) => {
                    setRole(+e);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((role, index) => (
                        <SelectItem
                          key={index}
                          value={role.id.toString()}
                          className="capitalize"
                        >
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="subRole" className="block font-medium text-md">
                  Sub Role :
                </label>
                <Select
                  name="subRoleId"
                  onValueChange={(e) => {
                    setSubRole(+e);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Sub Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subRoles.map((subRole, index) => {
                        if (subRole.role.id != role) return null;
                        return (
                          <SelectItem
                            key={index}
                            value={subRole.id.toString()}
                            className="capitalize"
                          >
                            {subRole.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block font-medium text-md">
                  Status :
                </label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active" className="capitalize">
                        Active
                      </SelectItem>
                      <SelectItem value="inactive" className="capitalize">
                        Inactive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block font-medium text-md">
                  Profile :
                </label>
                <Input
                  type="file"
                  placeholder="Upload Image"
                  name="image"
                  required
                />
              </div>
            </div>
            {errorMessage && (
              <div className="mb-2 p-2 text-sm text-red-700" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-2 p-2 text-sm text-green-700" role="alert">
                {successMessage}
              </div>
            )}
            <Button
              type="submit"
              className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Add User
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
