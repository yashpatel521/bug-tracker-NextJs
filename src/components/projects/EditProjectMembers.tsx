"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { checkRoleAccess } from "@/lib/utils";
import { useSession } from "next-auth/react";

const EditProjectMembers = ({
  totalPages = 1,
  handleAddMembers,
}: {
  totalPages: number;
  handleAddMembers: () => void;
}) => {
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
        {checkRoleAccess(session?.user, ["admin", "project_manager"]) && (
          <Button className="text-xs md:text-sm" onClick={handleAddMembers}>
            Update Members
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditProjectMembers;
