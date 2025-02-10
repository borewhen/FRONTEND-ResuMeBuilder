"use client"

import React, { useState } from 'react';
import { cn } from '@/lib/utils/helpers'; // Ensure you have the cn utility for class merging
import Link from 'next/link'; // Import the Link component from Next.js
import { usePathname } from 'next/navigation'; // Import usePathname

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get the current pathname
    const isLoginPage = pathname === '/login'; // Check if the current path is the login page

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
                    "fixed top-4 left-4 z-50 p-2 bg-dip-60 text-white rounded transition-transform duration-400 ease-in-out",
                    isOpen ? "translate-x-64" : "translate-x-0"
                )}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Navbar */}
            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-400 ease-in-out transform z-40",
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                )}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold">Navbar</h2>
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
};

export default Navbar;