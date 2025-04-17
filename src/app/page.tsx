"use client";

import { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
    const [hoverLogin, setHoverLogin] = useState(false);
    const [hoverSignup, setHoverSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Smoother scroll progress with spring physics
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Smoother opacity transitions with more overlap
    /* Original opacity settings
    const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const opacity2 = useTransform(
        smoothProgress,
        [0.15, 0.25, 0.4, 0.5],
        [0, 1, 1, 0]
    );
    const opacity3 = useTransform(
        smoothProgress,
        [0.4, 0.5, 0.65, 0.75],
        [0, 1, 1, 0]
    );
    const opacity4 = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.9, 1],
        [0, 1, 1, 1]
    ); */

    const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);

    const opacity2 = useTransform(
        smoothProgress,
        [0.05, 0.15, 0.3, 0.4],
        [0, 1, 1, 0]
    );
    const opacity3 = useTransform(
        smoothProgress,
        [0.25, 0.4, 0.55, 0.65],
        [0, 1, 1, 0]
    );
    const opacity4 = useTransform(
        smoothProgress,
        [0.5, 0.65, 0.8, 0.9],
        [0, 1, 1, 1]
    );

    // Smoother parallax effects with less extreme movement
    const y1 = useTransform(smoothProgress, [0, 0.25], [0, 50]);
    const y2 = useTransform(smoothProgress, [0.15, 0.5], [-50, 50]);
    const y3 = useTransform(smoothProgress, [0.4, 0.75], [-50, 50]);
    const y4 = useTransform(smoothProgress, [0.65, 1], [-50, 0]);

    // Refs for section elements
    const feature1Ref = useRef<HTMLElement>(null);
    const feature2Ref = useRef<HTMLElement>(null);
    const feature3Ref = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    // Check if sections are in view
    const feature1InView = useInView(feature1Ref, { once: false, amount: 0.3 });
    const feature2InView = useInView(feature2Ref, { once: false, amount: 0.3 });
    const feature3InView = useInView(feature3Ref, { once: false, amount: 0.3 });
    const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });

    // Check authentication status
    useEffect(() => {
        // This is a placeholder - replace with your actual auth check
        const checkAuth = async () => {
            // Example: check localStorage, cookies, or call an API
            const token = localStorage.getItem("authToken");
            setIsLoggedIn(!!token);
        };

        checkAuth();
    }, []);

    // Scroll to section function
    const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full bg-dip-100 relative">
            {/* Custom Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-dip-100/90 backdrop-blur-sm z-50 py-4 px-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Image
                            alt="UHired.ai Logo"
                            width={40}
                            height={40}
                            src="/logo.svg"
                            className="mr-2"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://placehold.co/40x40/dip-100/black?text=UH";
                            }}
                        />
                        <Link href="/" className="text-dip-blk text-xl font-bold">
                            UHired.ai
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!isLoggedIn ? (
                            // Pre-login navigation - scrolls to feature sections
                            <>
                                <button
                                    onClick={() => scrollToSection(feature1Ref)}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    AI Practice
                                </button>
                                <button
                                    onClick={() => scrollToSection(feature2Ref)}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Video Interview
                                </button>
                                <button
                                    onClick={() => scrollToSection(feature3Ref)}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Course Generator
                                </button>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="w-[100px] text-dip-blk/80 hover:text-dip-blk px-4 py-2 rounded-full border border-dip-0 border-2 font-bold transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="w-[100px] border border-2 border-dip-0 bg-dip-0 text-dip-100 hover:bg-dip-0/90 px-4 py-2 rounded-full font-bold transition-colors"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            // Post-login navigation - links to app sections
                            <>
                                <Link
                                    href="/jobs"
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Jobs
                                </Link>
                                <Link
                                    href="/course"
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Courses
                                </Link>
                                <Link
                                    href="/interview"
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Live Video Interview
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-dip-blk"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-dip-100 px-6 py-4">
                        {!isLoggedIn ? (
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={() => {
                                        scrollToSection(feature1Ref);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    AI Practice
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection(feature2Ref);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Video Analysis
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection(feature3Ref);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-dip-blk/80 hover:text-dip-blk transition-colors"
                                >
                                    Course Generator
                                </button>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="text-dip-0/80 hover:text-dip-0 border border-dip-0 border-2 px-4 py-2 rounded-full transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="border border-2 border-dip-0 bg-dip-0 text-dip-100 hover:bg-dip-0/90 px-4 py-2 rounded-full transition-colors w-full"
                                >
                                    Sign Up
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/jobs"
                                    className="text-dip-0/80 hover:text-dip-0 transition-colors"
                                >
                                    Jobs
                                </Link>
                                <Link
                                    href="/course"
                                    className="text-dip-0/80 hover:text-dip-0 transition-colors"
                                >
                                    Courses
                                </Link>
                                <Link
                                    href="/interview"
                                    className="text-dip-0/80 hover:text-dip-0 transition-colors"
                                >
                                    Live Video Interview
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="text-dip-0/80 hover:text-dip-0 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Add padding to account for fixed navbar */}
            <div className="pt-16"></div>

            {/* Section Transition Overlays */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
                {/* Overlay between Hero and Feature 1 */}
                <motion.div
                    className="absolute w-full h-24 bg-gradient-to-b from-transparent to-dip-80/50"
                    style={{
                        top: "calc(100vh - 6rem)",
                        opacity: useTransform(
                            smoothProgress,
                            [0.1, 0.2, 0.3],
                            [0, 1, 0]
                        ),
                    }}
                />

                {/* Overlay between Feature 1 and Feature 2 */}
                <motion.div
                    className="absolute w-full h-24 bg-gradient-to-b from-transparent to-dip-80/50"
                    style={{
                        top: "calc(200vh - 6rem)",
                        opacity: useTransform(
                            smoothProgress,
                            [0.35, 0.45, 0.55],
                            [0, 1, 0]
                        ),
                    }}
                />

                {/* Overlay between Feature 2 and Feature 3 */}
                <motion.div
                    className="absolute w-full h-24 bg-gradient-to-b from-transparent to-dip-80/50"
                    style={{
                        top: "calc(300vh - 6rem)",
                        opacity: useTransform(
                            smoothProgress,
                            [0.6, 0.7, 0.8],
                            [0, 1, 0]
                        ),
                    }}
                />

                {/* Overlay between Feature 3 and CTA */}
                <motion.div
                    className="absolute w-full h-24 bg-gradient-to-b from-transparent to-dip-80/50"
                    style={{
                        top: "calc(400vh - 6rem)",
                        opacity: useTransform(
                            smoothProgress,
                            [0.85, 0.9, 0.95],
                            [0, 1, 0]
                        ),
                    }}
                />
            </div>

            {/* Hero Section */}
            <motion.section
                className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-dip-100 to-dip-80"
                style={{ opacity: opacity1, y: y1 }}
            >
                <div className="max-w-4xl w-full text-center">
                    {/* Logo */}
                    <div className="mb-12">
                        <h1 className="text-dip-blk text-4xl font-bold">
                            UHired.ai
                        </h1>
                    </div>

                    {/* Main Slogan */}
                    <motion.h2
                        className="text-dip-blk text-5xl md:text-7xl font-bold mb-8 max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Practice. Review. <br className="hidden sm:block" />
                        Interview. Succeed.
                    </motion.h2>

                    {/* Subheading */}
                    <motion.p
                        className="text-dip-blk/80 text-xl md:text-2xl mb-12 max-w-4xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Opportunities are for those who prepare for them.{" "}
                        <br className="hidden sm:block" />
                        Prepare for your opportunities here, all in one place.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: hoverSignup ? 1.05 : 0,
                                    opacity: hoverSignup ? 1 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            />
                            <Button
                                className="w-[140px] border border-4 border-dip-0 bg-dip-0 text-dip-100 hover:bg-dip-0/90 text-lg font-bold py-6 px-10 rounded-full transition-all"
                                onMouseEnter={() => setHoverSignup(true)}
                                onMouseLeave={() => setHoverSignup(false)}
                                onClick={() => router.push("/register")}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: hoverLogin ? 1.05 : 0,
                                    opacity: hoverLogin ? 1 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            />
                            <Button
                                variant="outline"
                                className="w-[140px] border border-4 border-dip-0 text-dip-0/80 hover:bg-dip-0/10 px-10 py-6 text-lg font-bold rounded-full transition-all"
                                onMouseEnter={() => setHoverLogin(true)}
                                onMouseLeave={() => setHoverLogin(false)}
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-dip-0/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </motion.section>

            {/* Feature 1: AI-Powered Practice */}
            <motion.section
                ref={feature1Ref}
                className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-dip-80 to-dip-100"
                style={{ opacity: opacity2, y: y2 }}
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                            opacity: feature1InView ? 1 : 0,
                            x: feature1InView ? 0 : -50,
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-dip-0 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-dip-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <motion.h2
                            className="text-dip-blk text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature1InView ? 1 : 0,
                                y: feature1InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Job Specific AI Interview
                        </motion.h2>
                        <motion.p
                            className="text-dip-blk/80 text-xl leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature1InView ? 1 : 0,
                                y: feature1InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Our AI analyzes your job description and generates
                            customized interview questions based on the required
                            skills, role, and industry.
                        </motion.p>
                        <motion.ul
                            className="text-dip-blk/80 text-lg space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: feature1InView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: feature1InView ? 1 : 0,
                                    x: feature1InView ? 0 : -20,
                                }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Role-specific technical questions</span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: feature1InView ? 1 : 0,
                                    x: feature1InView ? 0 : -20,
                                }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Tailored questions aligned with the job
                                    posting
                                </span>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                            opacity: feature1InView ? 1 : 0,
                            x: feature1InView ? 0 : 50,
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="bg-dip-90/30 backdrop-blur-sm rounded-2xl shadow-xl">
                            <img
                                src="/mock_interview.png"
                                alt="AI Practice Interface"
                                className="rounded-xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/600x400/dip-80/black?text=AI+Practice+Interface";
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Feature 2: Video Analysis */}
            <motion.section
                ref={feature2Ref}
                className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-dip-80 to-dip-70"
                style={{ opacity: opacity3, y: y3 }}
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row-reverse items-center gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                            opacity: feature2InView ? 1 : 0,
                            x: feature2InView ? 0 : 50,
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-dip-0 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-dip-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <motion.h2
                            className="text-dip-blk text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature2InView ? 1 : 0,
                                y: feature2InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Live Video Interview
                        </motion.h2>
                        <motion.p
                            className="text-dip-blk/80 text-xl leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature2InView ? 1 : 0,
                                y: feature2InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Record your practice interviews and receive detailed
                            feedback on your performance. Our AI analyzes your
                            resume and ask you behavioural & technical questions
                            regarding your past experiences.
                        </motion.p>
                        <motion.ul
                            className="text-dip-blk/80 text-lg space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: feature2InView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: feature2InView ? 1 : 0,
                                    x: feature2InView ? 0 : 20,
                                }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Personalized questions based on your resume
                                </span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: feature2InView ? 1 : 0,
                                    x: feature2InView ? 0 : 20,
                                }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Eye contact detection</span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: feature2InView ? 1 : 0,
                                    x: feature2InView ? 0 : 20,
                                }}
                                transition={{ duration: 0.3, delay: 0.7 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Receive actionable feedback to improve on
                                </span>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                            opacity: feature2InView ? 1 : 0,
                            x: feature2InView ? 0 : -50,
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="bg-dip-80/30 backdrop-blur-sm rounded-2xl shadow-xl">
                            <img
                                src="/video.png"
                                alt="Video Analysis Interface"
                                className="rounded-xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/600x400/dip-70/black?text=Video+Analysis+Interface";
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Feature 3: Job Matching */}
            <motion.section
                ref={feature3Ref}
                className="min-h-screen flex items-center justify-center px-4 py-20"
                style={{ opacity: opacity4, y: y4 }}
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                            opacity: feature3InView ? 1 : 0,
                            x: feature3InView ? 0 : -50,
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-dip-0 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-dip-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <motion.h2
                            className="text-dip-blk text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature3InView ? 1 : 0,
                                y: feature3InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Course Generator
                        </motion.h2>
                        <motion.p
                            className="text-dip-blk/80 text-xl leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: feature3InView ? 1 : 0,
                                y: feature3InView ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Our AI analyzes your responses from past mock
                            interviews to detect skill gaps and automatically
                            generates targeted practice questions and learning
                            modules to help you improve.
                        </motion.p>
                        <motion.ul
                            className="text-dip-blk/80 text-lg space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: feature3InView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: feature3InView ? 1 : 0,
                                    x: feature3InView ? 0 : -20,
                                }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>AI-powered skill gap detection</span>
                            </motion.li>
                            <motion.li
                                className="flex items-start"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: feature3InView ? 1 : 0,
                                    x: feature3InView ? 0 : -20,
                                }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-dip-0 mr-2 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Personalized course generation</span>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                            opacity: feature3InView ? 1 : 0,
                            x: feature3InView ? 0 : 50,
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="bg-dip-70/30 backdrop-blur-sm rounded-2xl shadow-xl">
                            <img
                                src="/course.png"
                                alt="Job Matching Interface"
                                className="rounded-xl w-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/600x400/dip-60/black?text=Job+Matching+Interface";
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                ref={ctaRef}
                className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
                style={{ opacity: opacity4 }}
            >
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: ctaInView ? 1 : 0 }}
                    transition={{ duration: 1 }}
                />

                <div className="max-w-4xl w-full text-center relative z-10">
                    <motion.h2
                        className="text-dip-blk text-4xl md:text-6xl font-bold mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 30,
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        Ready to transform your career?
                    </motion.h2>
                    <motion.p
                        className="text-dip-blk/80 text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 30,
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        All you need in one place, right here.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 30,
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button
                            className="w-[140px] border border-4 border-dip-0 bg-dip-0 text-dip-100 hover:bg-dip-0/90 text-lg font-bold py-6 px-10 rounded-full"
                            onClick={() => router.push("/register")}
                        >
                            Sign Up
                        </Button>

                        <Button
                            className="w-[140px] bg-transparent border-4 border-dip-0 text-dip-0/80 hover:bg-dip-0/10 text-lg font-bold py-6 px-10 rounded-full"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    </motion.div>

                    {/* Testimonials */}
                    <motion.div
                        className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 50,
                        }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="bg-dip-60/30 backdrop-blur-sm rounded-2xl p-8 text-left"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{
                                x: ctaInView ? 0 : -30,
                                opacity: ctaInView ? 1 : 0,
                            }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <p className="text-dip-blk/90 text-lg italic mb-6">
                                &quot;UHired.ai transformed my interview preparation.
                                The AI feedback helped me identify weaknesses I
                                didn&apos;t know I had.&quot;
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-dip-0 mr-4"></div>
                                <div>
                                    <p className="text-dip-blk font-bold">
                                        Sarah
                                    </p>
                                    <p className="text-dip-blk/70 text-sm">
                                        Software Engineer
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-dip-60/30 backdrop-blur-sm rounded-2xl p-8 text-left"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{
                                x: ctaInView ? 0 : 30,
                                opacity: ctaInView ? 1 : 0,
                            }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <p className="text-dip-blk/90 text-lg italic mb-6">
                                &quot;The job matching feature connected me with
                                opportunities I wouldn&apos;t have found otherwise.
                                Landed my dream job in weeks!&quot;
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-dip-0 mr-4"></div>
                                <div>
                                    <p className="text-dip-blk font-bold">
                                        Michael
                                    </p>
                                    <p className="text-dip-blk/70 text-sm">
                                        Product Manager
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-dip-100 text-dip-blk/50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-dip-blk text-2xl font-bold mb-4">
                                UHired.ai
                            </h3>
                            <p className="max-w-xs">
                                Your path to career success starts with the
                                right preparation.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-dip-blk font-bold mb-4">
                                    Company
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-dip-blk"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-dip-blk"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dip-0/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p>© 2025 UHired.ai. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-dip-0">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-dip-0">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-dip-0">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
