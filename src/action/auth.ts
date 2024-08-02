import { POST } from "./request";

export const login = async (email: string, password: string) => {
  const result = await POST("/users/login", { email, password });
  return result;
};
