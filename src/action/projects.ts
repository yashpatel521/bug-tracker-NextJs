import { SECURE_GET } from "./request";

export async function getProjectData(
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
