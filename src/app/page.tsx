"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ui/Theme/theme-toggle";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { GlobeDemo } from "@/components/dashboard/GithubGlobe";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimatedBeamDemo } from "@/components/dashboard/AnimatedBeam";
// import ThemeToggle from "@/components/ui/Theme/theme-toggle";

const LandingPage = () => {
  return (
    // <BackgroundBeamsWithCollision>
    // </BackgroundBeamsWithCollision>
    <div className="dark:bg-grid-white/[0.1] bg-grid-black/[0.2] ">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_bottom_left,transparent_10%,black)]"></div>

      <div className="bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        <div className="flex flex-col w-full h-full">
          <header className="bg-dark-blue">
            <div className="container mx-auto flex justify-between items-center ">
              <h1 className="text-2xl font-bold">
                <Logo />
              </h1>
              <ThemeToggle />
            </div>
          </header>
          <Separator />
          <section className="flex flex-col items-center py-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-5xl font-bold mb-4">
                  Be the
                  <span className="text-[var(--themeColor)]"> #1 </span>
                  Project Management System
                </h2>
                <TextGenerateEffect
                  className="text-lg mb-6"
                  words="Streamline your projects and enhance productivity with our
                cloud-based PMS. Free 1 Month Trial !"
                />
                <Link
                  href="/login"
                  className="bg-[var(--themeColor)]  py-3 px-6 rounded-full inline-block shadow-lg transition-shadow duration-300 transform hover:scale-105 hover:shadow-yellow-100"
                >
                  Start for Free
                </Link>
              </div>
              {/* <AnimatedBeamDemo /> */}
              <div className="md:w-1/2 relative flex flex-col items-center justify-center mt-10 md:mt-0 h-[80vh]">
                <GlobeDemo />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
