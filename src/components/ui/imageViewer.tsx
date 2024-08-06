import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icons } from "./icons";

const ImageViewer = ({ images }: { images: string[] }) => {
  const DownloadIcon = Icons["download"];
  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border pb-2">
        <div className="flex gap-4 m-2 opacity-50">
          {images.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Image
                  src={item}
                  width={100}
                  height={100}
                  className="rounded-lg shadow-lg"
                  key={index}
                  alt="alt"
                />
              </DialogTrigger>
              <DialogContent className=" w-full ">
                <a
                  href={item}
                  target="_blank"
                  download
                  className="absolute top-2 left-2  rounded-full p-2 shadow-md"
                >
                  <DownloadIcon />
                </a>
                <Image
                  src={item}
                  width={100}
                  height={100}
                  className="rounded-lg shadow-lg w-full h-full p-5"
                  key={index}
                  alt="alt"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ImageViewer;
