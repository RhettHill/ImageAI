"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/app/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 px-4 md:px-6">
        <h2 className="text-2xl font-semibold text-dark-600">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 md:px-6">
          {images.map((image) => (
            <Card key={String(image._id)} image={image} />
          ))}
        </ul>
      ) : (
        <div className="flex h-60 items-center justify-center text-dark-400">
          <p className="text-lg font-medium">No images found</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full items-center justify-between px-4 md:px-6">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="p-16-medium text-sm text-dark-500">
              Page {page} of {totalPages}
            </p>

            <Button
              disabled={Number(page) >= totalPages}
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li className="flex flex-col gap-2">
      <Link href={`/transformations/${image._id}`} className="block group">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="aspect-square w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-sm font-medium text-dark-700">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={18}
            height={18}
          />
        </div>
      </Link>
    </li>
  );
};
