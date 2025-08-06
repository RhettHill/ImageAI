"use client";
import { navLinks } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-72 flex-col bg-white p-5 shadow-md shadow-purple-200/50">
      <div className="flex flex-col h-full gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 py-2">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="flex flex-col justify-between h-full gap-4">
          <SignedIn>
            {/* First half of nav */}
            <ul className="flex flex-col gap-2">
              {navLinks.slice(0, 6).map((link) => {
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
                        className={`${isActive ? "brightness-200" : ""}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Second half of nav */}
            <ul className="flex flex-col gap-2">
              {navLinks.slice(6).map((link) => {
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
                        className={`${isActive ? "brightness-200" : ""}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              {/* User Profile Button */}
              <li className="flex items-center justify-center gap-2 p-4">
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>

          {/* Logged out button */}
          <SignedOut>
            <Button
              asChild
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
