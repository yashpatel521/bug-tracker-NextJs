"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const AddSearchParams = ({ type, value }: { type: string; value: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());
  params.set(type, value);

  // This will change the URL without a page refresh
  router.replace(`${pathname}?${params.toString()}`);

  return null;
};

export default AddSearchParams;
