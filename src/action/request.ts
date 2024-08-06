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
    return {
      success: false,
      message: "Failed to fetch data",
      data: null,
    };
  }
}

export async function SECURE_POST(
  url: string,
  dataBody: any
): Promise<ResponseType> {
  const data = await getServerSession(authConfig);
  const token = data?.user.accessToken;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const isFormData = dataBody instanceof FormData;

  if (!isFormData) {
    myHeaders.append("Content-Type", "application/json");
  }

  try {
    // Fetch request
    const res = await fetch(`${BACKEND_URL}${url}`, {
      method: "POST",
      headers: myHeaders,
      body: isFormData ? dataBody : JSON.stringify(dataBody),
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

export async function SECURE_DELETE(url: string): Promise<ResponseType> {
  const data = await getServerSession(authConfig);
  const token = data?.user.accessToken;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  try {
    // Fetch request
    const res = await fetch(`${BACKEND_URL}${url}`, {
      method: "DELETE",
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
