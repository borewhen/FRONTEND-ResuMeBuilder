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
                <div className="pt-16 px-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="flex items-center hover:bg-dip-20 p-2 rounded-lg mx-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Seong_Gi-hun_season_1.png/220px-Seong_Gi-hun_season_1.png" 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="ml-3 text-dip-100 font-bold italic">You</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/interview" className="block px-4 py-2 text-dip-100 font-bold hover:bg-dip-20 rounded-lg mx-2">Interview</Link>
                        </li>
                        <li>
                            <Link href="/jobs" className="block px-4 py-2 text-dip-100 font-bold hover:bg-dip-20 rounded-lg mx-2">Jobs</Link>
                        </li>
                        <li>
                            <Link href="/activity" className="block px-4 py-2 text-dip-100 font-bold hover:bg-dip-20 rounded-lg mx-2">Activity</Link>
                        </li>
                        <li>
                            <Link href="/course" className="block px-4 py-2 text-dip-100 font-bold hover:bg-dip-20 rounded-lg mx-2">Course</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}