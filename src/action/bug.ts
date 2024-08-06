"use server";
import { SECURE_GET } from "./request";

export async function getBugDetailsData(id: number) {
  const result = await SECURE_GET(`/projects/bugs/${id}`);
  if (!result.success) throw new Error(result.message);
  return result.data;
}
