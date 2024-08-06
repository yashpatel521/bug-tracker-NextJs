"use server";

import { SECURE_GET } from "./request";

export async function getAllRole() {
  const result = await SECURE_GET("/roles");
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function getAllSubRole() {
  const result = await SECURE_GET("/subRoles");
  if (!result.success) throw new Error(result.message);
  return result.data;
}
