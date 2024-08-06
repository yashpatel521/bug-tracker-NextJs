"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { checkRoleAccess } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Version } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
const BugTableHeader = ({
  versionList,
  selectedVersion,
  totalPages,
}: {
  versionList: Version[];
  selectedVersion: number;
  totalPages: number;
}) => {
  const CubeIcon = Icons["Cube"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams ?? "");
    params.set("currentPage", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleVersionSelect = (versionId: string) => {
    const params = new URLSearchParams(searchParams ?? "");
    params.set("versionId", versionId);
    params.set("currentPage", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrevious = () => {
    const params = new URLSearchParams(searchParams || "");
    const page = parseInt(params.get("currentPage") || "1", 10);
    if (page > 1) {
      params.set("currentPage", (page - 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleNext = () => {
    const params = new URLSearchParams(searchParams || "");
    const page = parseInt(params.get("currentPage") || "1", 10);
    if (page < totalPages) {
      params.set("currentPage", (page + 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const currentPage = parseInt(searchParams?.get("currentPage") || "1", 10);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          <Select
            onValueChange={handleVersionSelect}
            value={selectedVersion.toString()}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {versionList.map((version, index) => (
                  <SelectItem key={index} value={version.id.toString()}>
                    {version.versionNumber}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Search bugs..."
          className="max-w-sm"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams?.get("query")?.toString()}
        />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePrevious()}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleNext()}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
        <Button className="text-xs md:text-sm hover:bg-transparent bg-transparent">
          <Link href={`${pathname}/add`}>
            <CubeIcon
              height="30"
              width="30"
              className="text-[var(--themeColor)]"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BugTableHeader;
