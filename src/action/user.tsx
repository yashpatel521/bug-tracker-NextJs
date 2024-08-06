"use server";

import { revalidatePath } from "next/cache";
import { SECURE_GET, SECURE_POST } from "./request";
import { redirect } from "next/navigation";

export async function getAllUser(
  currentPage: string = "1",
  query: string = "",
  sortBy: string = "createdAt",
  sortOrder: string = "desc"
) {
  const result = await SECURE_GET(
    `/users?currentPage=${currentPage}&query=${query}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function createNewUser(formData: FormData) {
  const result = await SECURE_POST("/users", formData);
  if (!result.success) throw new Error(result.message);
  revalidatePath("/dashboard/user");
  redirect("/dashboard/user");
}
