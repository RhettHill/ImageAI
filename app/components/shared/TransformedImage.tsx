"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

// Helper function to format transformation config for Cloudinary
const formatTransformationConfig = (config: any) => {
  if (!config) return {};

  const formattedConfig: any = {};

  // Handle each transformation type with proper Cloudinary formatting
  if (config.restore) {
    formattedConfig.enhance = true;
  }

  if (config.removeBackground) {
    formattedConfig.removeBackground = true;
  }

  if (config.fillBackground) {
    formattedConfig.fillBackground = true;
  }

  if (config.remove) {
    formattedConfig.remove = config.remove;
  }

  if (config.recolor) {
    formattedConfig.recolor = config.recolor;
  }

  if (config.blur) {
    formattedConfig.blur = `${config.blur}`;
  }

  if (config.sharpen) {
    formattedConfig.sharpen = true;
  }

  if (config.grayscale) {
    formattedConfig.grayscale = true;
  }

  if (config.sepia) {
    formattedConfig.sepia = true;
  }

  if (config.pixelate) {
    formattedConfig.pixelate = true;
  }

  if (config.cartoonify) {
    formattedConfig.cartoonify = true;
  }

  if (config.oilPaint) {
    formattedConfig.oilPaint = true;
  }

  if (config.vignette) {
    formattedConfig.vignette = true;
  }

  if (config.colorize) {
    formattedConfig.colorize = `${config.colorize.level}:${config.colorize.color}`;
  }

  if (config.improve) {
    formattedConfig.improve = true;
  }

  return formattedConfig;
};
const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...formatTransformationConfig(transformationConfig),
      }),
      title
    );
    console.log("newUrl: ", image.publicId);
  };

  console.log("transformedangle ", transformationConfig?.angle);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>

        {hasDownload && (
          <button className="download-btn" onClick={downloadHandler}>
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="cursor-pointer overflow-hidden rounded-[10px]">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title || "Transformed Image"}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            angle={transformationConfig.angle}
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)();
            }}
            {...formatTransformationConfig(transformationConfig)}
          />

          {isTransforming && (
            <div className="flex items-center justify-center left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700/90">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg p-10 hover:bg-gray-50 cursor-pointer text-sm text-gray-600">
          Transformed Image
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
