"use client";
import Link from "next/link";
import React from "react";

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">{error.message}</h2>
      <p>{error.name}</p>
      <pre>{error.stack}</pre>
      <div className="mt-8 flex justify-center gap-2">
        <Link
          className="border p-3 rounded-xl text-black bg-gray-500 hover:bg-gray-400 "
          href="/dashboard"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
