"use client";
import { togglePinProject } from "@/action/dashboard";
import { Icons } from "./ui/icons";
import { customToast } from "@/lib/utils";

const TogglePinProjectButton = ({
  id,
  isPinned,
}: {
  id: number;
  isPinned: boolean;
}) => {
  const UnPinIcon = Icons["UnPin"];
  const PinIcon = Icons["Pin"];

  const handleClick = async () => {
    try {
      const res = await togglePinProject(id, isPinned);
      if (res.success) {
        isPinned
          ? customToast("Project pinned successfully", "success")
          : customToast("Project unPinned successfully", "success");
      } else {
        customToast("Failed to pin project", "error");
      }
    } catch (error) {
      console.error(error);
      customToast("Failed to pin project", "error");
    }
  };

  return (
    <button onClick={handleClick}>
      {isPinned ? <PinIcon /> : <UnPinIcon />}
    </button>
  );
};

export default TogglePinProjectButton;
