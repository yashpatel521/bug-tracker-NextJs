"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn, customToast } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import GithubSignInButton from "./github-auth-button";
import GoogleSignInButton from "./google-auth-button";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(""); // Reset the error at the start of the function

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
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
  const EyeIcon = Icons["Eye"];
  const ClosedEyeIcon = Icons["ClosedEye"];
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <form>
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
            <div className="relative">
              <Input
                id="password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 px-3 py-1 text-sm leading-5"
              >
                {passwordVisible ? <ClosedEyeIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <Button
            className="bg-black border text-white hover:bg-[var(--themeColor)] hover:text-black"
            disabled={isLoading}
            onClick={handleSubmit}
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
      <div className="flex gap-2">
        <GithubSignInButton />
        <GoogleSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default LoginForm;
