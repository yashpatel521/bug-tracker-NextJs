"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ui/Theme/theme-toggle";
// import ThemeToggle from "@/components/ui/Theme/theme-toggle";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-blue ">
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
            <p className="text-lg mb-6">
              Streamline your projects and enhance productivity with our
              cloud-based PMS. Free 1 Month Trial !
            </p>
            <Link
              href="/login"
              className="bg-[var(--themeColor)]  py-3 px-6 rounded-full inline-block shadow-lg transition-shadow duration-300 transform hover:scale-105 hover:shadow-yellow-100"
            >
              Start for Free
            </Link>
          </div>
          <div className="md:w-1/2 relative flex flex-col items-center justify-center mt-10 md:mt-0 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-24 w-24 md:h-32 md:w-32 z-20"
              >
                <Image
                  src="/images/mobile.png"
                  alt="Mobile View"
                  width={128}
                  height={128}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 40 }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-0 left-0 h-36 w-36 md:h-48 md:w-48 z-10"
              >
                <Image
                  src="/images/tablet.png"
                  alt="Tablet View"
                  width={192}
                  height={192}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: -40 }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-0 right-0 h-36 w-36 md:h-48 md:w-48 z-10"
              >
                <Image
                  src="/images/laptop.png"
                  alt="Laptop View"
                  width={192}
                  height={192}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-72 w-72 md:h-96 md:w-96 z-0"
              >
                <Image
                  src="/images/desktop.png"
                  alt="Desktop View"
                  width={384}
                  height={384}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
