"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react"; // Icons from Lucide
import Image from "next/image";
import UserAvatar from "./avatar";

const navItems = [
  { name: "Jobs", href: "/jobs" },
  { name: "Courses", href: "/course" },
  { name: "Live Video Interview", href: "/interviews" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-[80px] py-4 bg-white shadow-sm border border-b-[#A8A8A8]">
      <div className="flex items-center space-x-4">
        <Image
          alt="favicon"
          loading="lazy"
          width={40}
          height={40}
          decoding="async"
          data-nimg="1"
          className="dark:invert"
          style={{ color: "transparent" }}
          src="/logo.svg"
        />
        <div className="text-[22px] font-semibold text-gray-900">
          <span className="text-gray-900">UHired.ai</span>
        </div>
      </div>

      <div className="flex space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`relative text-gray-600 hover:text-gray-900 text-[16px] ${
              pathname === item.href ? "font-bold text-purple-600" : ""
            }`}
          >
            {item.name}
            {pathname === item.href && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-purple-600"></span>
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-7">
        <Search className="w-6 h-6 text-gray-500 cursor-pointer" />
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <UserAvatar />
      </div>
    </nav>
  );
}
