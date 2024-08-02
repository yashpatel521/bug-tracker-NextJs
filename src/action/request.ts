import { BACKEND_URL } from "@/lib/constants";
import { ResponseType } from "@/types";
import axios from "axios";

export const POST = async (url: string, data: any): Promise<ResponseType> => {
  try {
    const res = await axios.post(`${BACKEND_URL}${url}`, data);
    return res.data;
  } catch (error) {
    console.error("Request failed:", error);
    return {
      success: false,
      message: "Failed to send request",
      data: null,
    };
  }
};
