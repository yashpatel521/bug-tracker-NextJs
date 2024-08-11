"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { customToast, passwordValidity } from "@/lib/utils";
import { updateUserPassword } from "@/action/user";

const ChangePasswordForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword || !oldPassword) {
      setError("Please fill all the fields");
      return;
    }
    const passwordCheck = passwordValidity(newPassword);
    if (passwordCheck != "") {
      setError(passwordCheck);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateUserPassword(oldPassword, newPassword);
      customToast("Password updated successfully", "success");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = Icons["Eye"];
  const ClosedEyeIcon = Icons["ClosedEye"];
  return (
    <div className="p-6  w-full border rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-left border-b-2">
        Change Password?
      </h2>
      {error && <span className="ml-2 text-red-500 text-sm">{error}</span>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="mb-4">
          <Label htmlFor="newPassword" className="block font-medium text-md">
            New Password :
          </Label>
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
              placeholder="Enter password"
              defaultValue={""}
              onChange={(e) => setNewPassword(e.target.value)}
              required
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
        <div className="mb-4">
          <Label
            htmlFor="confirmpassword"
            className="block font-medium text-md"
          >
            Confirm Password :
          </Label>
          <div className="relative">
            <Input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
              placeholder="Enter password"
              defaultValue={""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-0 px-3 py-1 text-sm leading-5"
            >
              {confirmPasswordVisible ? <ClosedEyeIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="oldPassword" className="block font-medium text-md">
            Old Password :
          </Label>
          <div className="relative">
            <Input
              type={oldPasswordVisible ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              className="mt-1 p-2 w-full border rounded-md shadow-sm h-8"
              placeholder="Enter password"
              defaultValue={""}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
              className="absolute inset-y-0 right-0 px-3 py-1 text-sm leading-5"
            >
              {oldPasswordVisible ? <ClosedEyeIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </div>
  );
};

export default ChangePasswordForm;
