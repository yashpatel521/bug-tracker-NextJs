"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    setError("");
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      setError("An error occurred while logging in");
    } finally {
      setIsLoading(false);
      setError("");
    }
  };
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <Button
            className="bg-black border text-white hover:bg-[var(--themeColor)] hover:text-black"
            type="submit"
            disabled={isLoading}
          >
            <div>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
            </div>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
