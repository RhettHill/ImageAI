"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-lg border  px-3 py-2">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={20}
          height={20}
          className="opacity-70"
        />

        <Input
          className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-gray-400"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
