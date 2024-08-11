"use server";
import { revalidatePath } from "next/cache";
import { SECURE_DELETE, SECURE_GET, SECURE_POST } from "./request";

export async function getBugDetailsData(id: number) {
  const result = await SECURE_GET(`/projects/bugs/${id}`);
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function updateBug(formData: FormData) {
  const result = await SECURE_POST(`/projects/bugs/update`, formData);
  if (!result.success) throw new Error(result.message);
  revalidatePath(`/dashboard/projects/${result.data.project.id}?view=bugs`);
}

export async function createBugImage(formData: FormData) {
  const result = await SECURE_POST(
    `/projects/bugs/image/${formData.get("bugId")}`,
    formData
  );
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function deleteBugImage(imageId: number) {
  const result = await SECURE_DELETE(`/projects/bugs/image/${imageId}`);
  if (!result.success) throw new Error(result.message);
  return result.data;
}
