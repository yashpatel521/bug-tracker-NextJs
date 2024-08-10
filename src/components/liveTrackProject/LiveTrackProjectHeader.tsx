"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { addDailyStats } from "@/action/liveProject";
import { customToast } from "@/lib/utils";

const LiveTrackProjectHeader = () => {
  const [animate, setAnimate] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams ?? "");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleRefresh = async () => {
    setAnimate("animate-spin");
    await addDailyStats();
    setAnimate("");
    customToast("Daily Stats Updated", "success");
  };

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
      <Button
        onClick={handleRefresh}
        variant="ghost"
        size="sm"
        disabled={Boolean(animate)}
        className="bg-[var(--themeColor)]"
      >
        <RefreshCcw className={animate} />
      </Button>
    </div>
  );
};

export default LiveTrackProjectHeader;
