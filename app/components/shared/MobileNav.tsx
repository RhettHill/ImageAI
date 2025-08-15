"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Menu as Hamburger } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b-4 border-purple-100 bg-white p-5 lg:hidden z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2 items-center">
        <SignedIn>
          {/* Profile Button */}
          <UserButton />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger>
              <Hamburger
                size={32}
                className="cursor-pointer"
                aria-label="Menu"
              />
            </SheetTrigger>
            <SheetTitle></SheetTitle>
            <SheetContent className="focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 sm:w-64">
              <Image
                src="/assets/images/logo-text.svg"
                alt="Logo"
                width={152}
                height={23}
                className="mb-6"
              />
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;
                  return (
                    <li
                      key={link.route}
                      className={`rounded-md transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-purple-100"
                      }`}
                    >
                      <Link
                        href={link.route}
                        className="flex items-center gap-4 px-4 py-3"
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={isActive ? "brightness-200" : ""}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                {/* User Profile in Menu */}
                <li className="flex items-center justify-center gap-2 p-4 my-2">
                  <UserButton showName />
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>

        {/* Logged Out */}
        <SignedOut>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
