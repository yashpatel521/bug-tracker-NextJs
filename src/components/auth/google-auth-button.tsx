"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";

export default function GoogleSignInButton() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(""); // Reset the error at the start of the function

    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (result && result.error) {
        setError(result.error); // Set the error if there's an issue
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      setError("An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <Icons.google className="mr-2 h-4 w-4" />
      {isLoading ? (
        <Icons.spinner className="animate-spin h-4 w-4 ml-2" />
      ) : (
        "Google"
      )}
    </Button>
  );
}
