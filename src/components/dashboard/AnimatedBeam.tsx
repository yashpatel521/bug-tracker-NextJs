"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animatedBeam";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { forwardRef, useRef } from "react";
import { Icons } from "../ui/icons";
import Image from "next/image";

// @ts-ignore
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const GoogleDriveIcon = Icons["googleDrive"];
  return (
    <div
      className="relative flex w-full max-w-[700px] items-center justify-center max-h-[700px] h-[70vh]"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="w-20 h-20 dark:bg-black">
            <Image
              src="/beam/facebook.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
          <Circle ref={div5Ref} className="w-20 h-20 dark:bg-black">
            <Image
              src="/beam/whatsapp.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="w-20 h-20 dark:bg-black">
            <Image
              src="/beam/playStore.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
          <Circle ref={div4Ref} className="h-24 w-24 dark:bg-black">
            <Image
              src="/logo.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
          <Circle ref={div6Ref} className="w-20 h-20 dark:bg-black">
            <Image
              src="/beam/appStore.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={div3Ref}
            className="w-20 h-20 dark:bg-black overflow-hidden"
          >
            <Image
              src="/beam/clashRoyal.png"
              height={100}
              width={100}
              className="w-36 h-auto"
              alt="logo"
              priority
            />
          </Circle>
          <Circle ref={div7Ref} className="w-20 h-20 dark:bg-black">
            <Image
              src="/beam/game.png"
              height={80}
              width={80}
              className="w-auto h-auto"
              alt="logo"
              priority
            />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        reverse
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        reverse
        endYOffset={10}
      />
    </div>
  );
}
