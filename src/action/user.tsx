"use server";

import { SECURE_GET } from "./request";

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
