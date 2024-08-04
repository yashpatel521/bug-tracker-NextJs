"use server";
import { revalidatePath } from "next/cache";
import { SECURE_GET, SECURE_POST } from "./request";

export async function getProjectStatsData() {
  const result = await SECURE_GET("/projects/getProjectReports");
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data;
}

export async function getPinProjectData() {
  const result = await SECURE_GET("/projects/getPinProjects");
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data;
}

export async function togglePinProject(id: number, isPinned: boolean) {
  const result = await SECURE_POST(`/projects/togglePin/${id}`, {
    isPinned,
  });

  revalidatePath("/dashboard");
  return result;
}
