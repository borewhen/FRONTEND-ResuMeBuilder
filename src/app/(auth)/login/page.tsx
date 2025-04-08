"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import login from "@/lib/app/user/api/login";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";

interface UserLoginData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserLoginData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const { setRole } = useUserStore();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            setError("Please fill in all fields.");
            return;
        }

        const response = await login.post(userData);

        if ("user" in response) {
            setRole("unregistered");
            router.push("/jobs");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Card className="w-1/2 flex flex-col border-transparent justify-center px-16">
                <CardHeader>
                    <div className="mb-6">
                        <Image
                            src="https://cognimate.vercel.app/favicon.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Welcome back!
                    </h2>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Email
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your mail address"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Password
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {error && (
                            <div className="block text-red-500 text-sm font-medium mb-1">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <label className="flex items-center text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="mr-2 rounded"
                                />
                                Remember me
                            </label>
                            <Link
                                href="/reset"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <Button
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-900 transition"
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>

                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </CardContent>
            </Card>

            <div className="w-1/2 relative h-screen">
                <img
                    src="https://i.imgur.com/UPXZRVW.png"
                    alt="Login Image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
}
