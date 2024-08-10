"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { ProjectDetails } from "@/types";
import { addApp } from "@/action/liveProject";
import { customToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AddProjectDailog = ({ app }: { app: ProjectDetails }) => {
  const [loading, setLoading] = React.useState(false);
  const AddIcon = Icons["bookmarkPlus"];
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await addApp(app.appId);
      customToast("App has been added to your dashboard", "success");
      router.replace(`/dashboard/projects/${res.id}`);
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddIcon className=" text-green-400 mx-auto" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Track: {app.title} ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to track this app?
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="ghost"
          onClick={handleClick}
          disabled={loading}
          className="bg-[var(--themeColor)]"
        >
          {loading ? "Tracking..." : "Start Tracking"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDailog;
