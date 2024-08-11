import React from "react";
import { Icons } from "@/components/ui/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bug, BugImage } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createBugImage, deleteBugImage } from "@/action/bug";
import { customToast } from "@/lib/utils";
const BugImageHandle = ({ bugData }: { bugData: Bug }) => {
  const DownloadIcon = Icons["download"];
  const CrossCircleIcon = Icons["CrossCircle"];
  const [images, setImages] = React.useState(
    bugData.images.map((s: BugImage) => {
      return { src: s.src, id: s.id };
    }) ?? []
  );
  const handleRemoveImage = async (id: number) => {
    try {
      await deleteBugImage(id);
      setImages(images.filter((s: BugImage) => s.id !== id));
      customToast("Image deleted successfully", "success");
    } catch (error) {
      customToast("Failed to delete image", "error");
    }
  };

  const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formData = new FormData();
    if (files) {
      formData.append("images", files[0]);
      formData.append("bugId", bugData.id.toString());
      try {
        const res = await createBugImage(formData);
        setImages(images.concat({ id: res.id, src: res.src }));
        customToast("Image uploaded successfully", "success");
      } catch (error) {
        customToast("Failed to upload image", "error");
      }
    }
  };
  return (
    <>
      <Label className="block text-sm font-medium mt-3">Attachments</Label>
      <div className="mt-1 ml-2">
        <Input type="file" placeholder="Attachments" onChange={onImageUpload} />
        <ScrollArea className="w-full whitespace-nowrap rounded-md border pb-2">
          <div className="flex gap-4 m-2">
            {images.map((item, index) => (
              <Dialog key={index}>
                <div className="relative">
                  <DialogTrigger asChild>
                    <Image
                      src={item.src}
                      width={100}
                      height={100}
                      className="rounded-lg shadow-lg opacity-50 hover:opacity-100"
                      alt={`image-${index}`}
                    />
                  </DialogTrigger>
                  <CrossCircleIcon
                    className="absolute top-[-10px] right-[-8px] p-[1px] text-red-500 cursor-pointer"
                    onClick={() => handleRemoveImage(item.id)}
                  />
                </div>
                <DialogContent className="w-full">
                  <a
                    href={item.src}
                    target="_blank"
                    download
                    className="absolute top-2 left-2 rounded-full p-2 shadow-md"
                  >
                    <DownloadIcon />
                  </a>
                  <Image
                    src={item.src}
                    width={100}
                    height={100}
                    className="rounded-lg shadow-lg w-full h-full p-5"
                    alt={`image-${index}`}
                    unoptimized={true}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default BugImageHandle;
