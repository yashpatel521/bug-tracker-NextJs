"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { Icons } from "../ui/icons";
import { checkRoleAccess } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserSearchBar = ({ totalPages = 1 }: { totalPages: number }) => {
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
  const AddIcon = Icons["UserPlus"];
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Search by Name/Role..."
        className="max-w-sm"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams?.get("query")?.toString()}
      />
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
        {checkRoleAccess(session?.user, ["admin", "manager"]) && (
          <Button className="text-xs md:text-sm  hover:bg-transparent bg-transparent">
            <Link href="/dashboard/user/add">
              <AddIcon
                height="30"
                width="30"
                className="text-[var(--themeColor)]"
              />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserSearchBar;
