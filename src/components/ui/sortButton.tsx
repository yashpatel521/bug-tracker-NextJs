"use client";
import React from "react";
import { Button } from "./button";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SortButton = ({ title, sortKey }: { title: string; sortKey: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sortOrder, setSortOrder] = React.useState("asc");

  const handleSort = (sortKey: string) => {
    const params = new URLSearchParams(searchParams ?? "");
    params.set("sortBy", sortKey);
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    params.set("sortOrder", sortOrder);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      variant="ghost"
      className="bg-transparent hover:bg-transparent "
      onClick={(e) => {
        e.preventDefault();
        handleSort(sortKey);
      }}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SortButton;
