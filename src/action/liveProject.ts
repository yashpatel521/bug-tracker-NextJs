"use server";

import { redirect } from "next/navigation";
import { SECURE_GET, SECURE_POST } from "./request";
import { revalidatePath } from "next/cache";

export async function suggest() {
  const result = await SECURE_GET("/liveTrack/topApp");
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function addApp(appId: string) {
  const result = await SECURE_POST(`/liveTrack/addApp`, {
    appId,
  });
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function searchApp(term: string) {
  const result = await SECURE_GET(`/liveTrack/search?term=${term}`);
  if (!result.success) throw new Error(result.message);
  return result.data;
}

export async function addDailyStats() {
  const result = await SECURE_GET(`/liveTrack/checkDailyStats`);
  if (!result.success) throw new Error(result.message);
  return result.data;
}
