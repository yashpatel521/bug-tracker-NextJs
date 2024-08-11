"use server";
import { revalidatePath } from "next/cache";
import { SECURE_DELETE, SECURE_GET, SECURE_POST } from "./request";
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
  redirect(`/dashboard/projects/${projectId}?view=versions`);
}

export async function deleteVersion(formData: FormData) {
  // console.log(formData);
  const result = await SECURE_DELETE(
    `/projects/version/${formData.get("versionId")}`
  );
  if (!result.success) throw new Error(result.message);
  revalidatePath(`/dashboard/projects?view=versions`);
}

export async function updateProjectMember(
  projectId: number,
  userIds: string[]
) {
  const result = await SECURE_POST(`/projects/editUserToProject`, {
    projectId,
    userIds,
  });
  if (!result.success) throw new Error(result.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function createNewProject(formData: FormData) {
  const result = await SECURE_POST("/projects", formData);
  if (!result.success) throw new Error(result.message);
  redirect(`/dashboard/projects/${result.data.id}`);
}
