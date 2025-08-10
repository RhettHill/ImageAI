import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/app/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/app/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/app/components/shared/Checkout";

const Credits = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subTitle="Choose a credit package that suits your needs!"
      />

      <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top Info */}
            <div className="flex flex-col items-center text-center gap-4">
              <Image src={plan.icon} alt={plan.name} width={50} height={50} />

              <h3 className="text-xl font-semibold text-purple-600">
                {plan.name}
              </h3>

              <p className="text-3xl font-bold text-gray-900">${plan.price}</p>

              <p className="text-sm text-gray-600">{plan.credits} Credits</p>
            </div>

            {/* Features */}
            <ul className="mt-6 flex flex-col gap-4">
              {plan.inclusions.map((inclusion) => (
                <li
                  key={plan.name + inclusion.label}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={`/assets/icons/${
                      inclusion.isIncluded ? "check.svg" : "cross.svg"
                    }`}
                    alt={inclusion.label}
                    width={20}
                    height={20}
                  />
                  <span className="text-sm text-gray-700">
                    {inclusion.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action */}
            <div className="mt-6">
              {plan.name === "Free" ? (
                <Button variant="outline" className="w-full">
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Credits;
