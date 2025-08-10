"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-md mx-auto rounded-lg p-6 bg-white shadow-lg">
        <AlertDialogHeader>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Insufficient Credits
            </p>
            <AlertDialogCancel className="p-1 hover:bg-gray-100 rounded">
              <Image
                src="/assets/icons/close.svg"
                alt="Close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/images/stacked-coins.png"
              alt="Credit coins"
              width={320}
              height={85}
              className="object-contain"
              priority
            />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Oops.... Looks like you&#39;ve run out of free credits!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 text-base leading-relaxed">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
          <AlertDialogAction
            className="w-full rounded-md bg-gradient-to-r from-purple-600 to-purple-400 py-2 text-white font-semibold hover:brightness-110 transition"
            onClick={() => router.push("/credits")}
          >
            Yes, Proceed
          </AlertDialogAction>
          <AlertDialogCancel className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 text-gray-700 hover:bg-gray-200 transition">
            No, Cancel
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col gap-3"></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
