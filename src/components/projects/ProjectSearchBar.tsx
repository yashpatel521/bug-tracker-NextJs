"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Icons } from "../ui/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { checkRoleAccess } from "@/lib/utils";

const ProjectSearchBar = ({ totalPages = 1 }: { totalPages: number }) => {
  const { data: session } = useSession();
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
  const AddIcon = Icons["FolderGit2"];
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="search projects by title..."
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
          <Link href="/dashboard/projects/add">
            <AddIcon
              height="30"
              width="30"
              className="text-[var(--themeColor)]"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectSearchBar;
