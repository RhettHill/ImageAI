import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import Header from "@/app/components/shared/Header";
import TransformedImage from "@/app/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/app/components/shared/DeleteConfirmation";

const ImageDetails = async (props: SearchParamProps) => {
  const { params } = props;
  const { id } = await params;
  const { userId } = await auth();
  const image = await getImageById(id);

  if (!image)
    return (
      <div className="text-center mt-10 text-red-500">Image not found</div>
    );

  const metadata = [
    { label: "Transformation", value: image.transformationType },
    image.prompt && { label: "Prompt", value: image.prompt },
    image.color && { label: "Color", value: image.color },
    image.aspectRatio && { label: "Aspect Ratio", value: image.aspectRatio },
  ].filter(Boolean);

  return (
    <>
      <Header title={image.title} subTitle="" />

      {/* Image Metadata */}
      <section className="mt-6 flex flex-wrap gap-x-6 gap-y-4 border-b border-dark-400/10 pb-4">
        {metadata.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-dark-400/50 hidden md:inline">
                &#x25CF;
              </span>
            )}
            <p className="text-dark-600 text-sm font-medium">{item.label}:</p>
            <p className="text-purple-400 capitalize text-sm">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Image Display */}
      <section className="mt-10 transformation-grid">
        {/* Original */}
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
          <Image
            width={getImageSize(image.transformationType, image, "width")}
            height={getImageSize(image.transformationType, image, "height")}
            src={image.secureUrl}
            alt={image.title || "Original Image"}
            className="rounded-lg border border-gray-200 object-contain shadow-sm"
          />
        </div>

        {/* Transformed */}
        <TransformedImage
          image={image}
          type={image.transformationType}
          title={image.title}
          isTransforming={false}
          transformationConfig={image.config}
          hasDownload
        />
      </section>

      {/* Actions */}
      {userId === image.author.clerkId && (
        <div className="mt-6 space-y-4">
          <Button
            asChild
            type="button"
            className="h-[44px] w-full md:h-[54px] rounded-full"
          >
            <Link href={`/transformations/${image._id}/update`}>
              Update Image
            </Link>
          </Button>
          <DeleteConfirmation imageId={image._id} />
        </div>
      )}
    </>
  );
};

export default ImageDetails;
