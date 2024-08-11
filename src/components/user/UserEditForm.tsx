"use client";
import { ProjectFilter, Role, SubRole } from "@/types";
import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAllRole, getAllSubRole } from "@/action/role";
import { Button } from "../ui/button";
import { updateUserProfile } from "@/action/user";
import { customToast } from "@/lib/utils";

const UserEditForm = ({ user }: { user: ProjectFilter }) => {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [subRoles, setSubRoles] = React.useState<SubRole[]>([]);
  const [role, setRole] = React.useState<number>(user.role.id);
  const [subRole, setSubRole] = React.useState<number>(user.subRole.id);
  const [status, setStatus] = React.useState<string>(user.status);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getAllRole();
      setRoles(roles);
    };
    const fetchSubRoles = async () => {
      const subRoles = await getAllSubRole();
      setSubRoles(subRoles);
    };
    fetchRoles();
    fetchSubRoles();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", user.id.toString());
      formData.append("roleId", role.toString());
      formData.append("subRoleId", subRole.toString());
      formData.append("status", status);
      await updateUserProfile(formData);
      customToast("User updated successfully", "success");
    } catch (error: any) {
      customToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-left border-b-2 pb-2">
        Update User
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="mb-4">
          <Label htmlFor="role" className="block font-medium text-md">
            Role :
          </Label>
          <Select
            name="roleId"
            defaultValue={user.role.id.toString()}
            onValueChange={(e) => {
              setRole(+e);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roles.map((role: Role, index: number) => (
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
          <Label htmlFor="subRole" className="block font-medium text-md">
            Sub Role :
          </Label>
          <Select
            name="subRoleId"
            defaultValue={user.subRole.id.toString()}
            onValueChange={(e) => {
              setSubRole(+e);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Sub Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subRoles.map((subRole: SubRole, index: number) => {
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
          <Label htmlFor="status" className="block font-medium text-md">
            Status :
          </Label>
          <Select
            name="status"
            defaultValue={user.status}
            onValueChange={(e) => {
              setStatus(e);
            }}
          >
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
      </div>
      <Button disabled={loading} onClick={handleSubmit}>
        Update User
        {loading && (
          <span className="ml-2 text-sm text-gray-400">Loading...</span>
        )}
      </Button>
    </div>
  );
};

export default UserEditForm;
