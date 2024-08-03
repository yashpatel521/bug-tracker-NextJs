import { authConfig } from "@/lib/authConfig";
import { BACKEND_URL } from "@/lib/constants";
import { ResponseType } from "@/types";
import axios from "axios";
import { getServerSession } from "next-auth";

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

export async function SECURE_GET(url: string): Promise<ResponseType> {
  const data = await getServerSession(authConfig);
  const token = data?.user.accessToken;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  try {
    const res = await fetch(`${BACKEND_URL}${url}`, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch data",
      data: null,
    };
  }
}
