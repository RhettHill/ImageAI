"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Search } from "./Search";
import { transformationTypes } from "@/app/constants";
import { IImage } from "@/lib/database/models/image.model";

const CldImageClient = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldImage),
  { ssr: false }
);

export const Collection = ({
  hasSearch = false,
  images = [],
  page,
  totalPages = 1,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  // Filter only on the client after hydration
  useEffect(() => {
    setFilteredImages(
      images.filter((image) =>
        image.title.toLowerCase().startsWith(filterQuery.toLowerCase())
      )
    );
  }, [filterQuery, images]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 px-4 md:px-6">
        <h2 className="text-2xl font-semibold text-dark-600">Recent Edits</h2>
        {hasSearch && (
          <Search filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        )}
      </div>

      {filteredImages.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 md:px-6">
          {filteredImages.map((image) => (
            <Card key={String(image._id)} image={image} />
          ))}
        </ul>
      ) : (
        <div className="flex h-60 items-center justify-center text-dark-400">
          <p className="text-lg font-medium">No images found</p>
        </div>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => (
  <li className="flex flex-col gap-2">
    <a href={`/transformations/${image._id}`} className="block group">
      <CldImageClient
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
          alt=""
          width={18}
          height={18}
        />
      </div>
    </a>
  </li>
);
