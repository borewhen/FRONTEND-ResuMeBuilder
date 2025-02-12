"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/helpers'; // Ensure you have the cn utility for class merging
import Link from 'next/link'; // Import the Link component from Next.js
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get the current pathname
    const isLoginPage = pathname === '/login'; // Check if the current path is the login page

    // Close menu when pathname changes (i.e., when a link is clicked)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    if (isLoginPage) return null; // Do not render if on the login page

    return (
        <div>
            {/* Hamburger Icon Button */}
            <button
                onClick={toggleNavbar}
                className={cn(
                    "fixed top-4 left-4 z-50 p-2 text-dip-80 rounded transition-all duration-300 ease-in-out flex items-center justify-center",
                    isOpen ? "translate-x-44" : "translate-x-0"
                )}
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <span className={cn(
                        "absolute block h-[3px] w-6 bg-current transform transition-all duration-300 ease-in-out",
                        isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    )} />
                    <span className={cn(
                        "absolute block h-[3px] w-6 bg-current transform transition-all duration-300 ease-in-out",
                        isOpen ? "opacity-0" : "opacity-100"
                    )} />
                    <span className={cn(
                        "absolute block h-[3px] w-6 bg-current transform transition-all duration-300 ease-in-out",
                        isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    )} />
                </div>
            </button>

            {/* Navbar */}
            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-400 ease-in-out transform z-40",
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                )}
            >
                <div className="p-4">
                    <ul>
                        <li className="py-2">
                            <Link href="/user/profile" className="text-dip-100 font-bold hover:underline">Profile</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/interview" className="text-dip-100 font-bold hover:underline">Interview</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/jobs" className="text-dip-100 font-bold hover:underline">Jobs</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}