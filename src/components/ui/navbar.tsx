"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navItems = [
    { name: "Jobs", href: "/jobs" },
    { name: "Courses", href: "/course" },
    { name: "Live Video Interview", href: "/interview" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("access_token");
        router.push("/");
    };

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
                    src="/logo.png"
                />
            </div>

            <div className="flex space-x-10">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`relative text-gray-600 hover:text-gray-900 text-[16px] ${
                            pathname === item.href
                                ? "font-bold text-purple-600"
                                : ""
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
                <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-500">
                        <button className="text-gray-500 hover:text-gray-700">
                            <i>
                                <u onClick={logout}>Logout?</u>
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
