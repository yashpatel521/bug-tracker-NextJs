"use server";
import { revalidatePath } from "next/cache";
import { SECURE_GET, SECURE_POST } from "./request";
import { redirect } from "next/navigation";

export async function getAllProjectData(
  query: string = "",
  currentPage: number = 1
) {
  const result = await SECURE_GET(
    `/projects?query=${query}&currentPage=${currentPage}`
  );
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data;
}

export async function getProjectDetailsData(id: number) {
  const result = await SECURE_GET(`/projects/projectDetails/${id}`);
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data;
}

export async function getProjectBugsData(
  projectId: number,
  versionId: number,
  query: string = "",
  currentPage: number | string = 1,
  sortBy: string = "createdAt",
  sortOrder: string = "desc"
) {
  const result = await SECURE_GET(
    `/projects/${projectId}/bugs/${versionId}?sortBy=${sortBy}&sortOrder=${sortOrder}&query=${query}&currentPage=${currentPage}`
  );
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data;
}

export async function createNewVersion(formData: FormData) {
  const result = await SECURE_POST("/projects/addVersionToProject", formData);
  const projectId = formData.get("projectId");
  if (!result.success) throw new Error(result.message);
  revalidatePath("/dashboard/projects");
  redirect(`/dashboard/projects/${projectId}`);
}
