import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/app/components/shared/Collection";
import Header from "@/app/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const page = (await Number(params?.page)) || 1;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" subTitle="" />

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Credit Balance */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Credits Available</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={48}
              height={48}
              className="size-9 md:size-12"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {user.creditBalance}
            </h2>
          </div>
        </div>

        {/* Image Manipulation Count */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">
            Image Manipulations Done
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="manipulations"
              width={48}
              height={48}
              className="size-9 md:size-12"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {images?.data.length}
            </h2>
          </div>
        </div>
      </section>

      {/* Image Collection Section */}
      <section className="mt-12">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;
