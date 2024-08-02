const ENV = process.env;
export const PORT = ENV.PORT || 5001;

export const BACKEND_URL: string =
  (process.env.BACKEND_URL as string) || "http://localhost:5000";
