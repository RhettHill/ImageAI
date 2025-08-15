"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";

export const Search = ({
  filterQuery,
  setFilterQuery,
}: {
  filterQuery: string;
  setFilterQuery: (value: string) => void;
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
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
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
