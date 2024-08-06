"use server";

import { revalidatePath } from "next/cache";
import { SECURE_GET, SECURE_POST } from "./request";
import { redirect } from "next/navigation";

export async function getAllRole() {
  const result = await SECURE_GET("/roles");
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function createNewRole(name: string) {
  console.log("name", name);
  const result = await SECURE_POST("/roles", { name });
  console.log(result);
  if (!result.success) {
    throw new Error(result.message);
  }
  revalidatePath("/dashboard/role");
  redirect("/dashboard/role");
}

export async function getAllSubRole() {
  const result = await SECURE_GET("/subRoles");
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function createNewSubRole(name: string, roleId: number) {
  const result = await SECURE_POST("/subRoles", { name, roleId });
  if (!result.success) throw new Error(result.message);
  revalidatePath(`/dashboard/role`);
  redirect(`/dashboard/role`);
}
