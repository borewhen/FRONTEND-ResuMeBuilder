"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResetPage() {
    const [email, setEmail] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        setSubmitted(true);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Card className="w-full md:w-1/2 flex flex-col border-transparent justify-center px-16">
                <CardHeader>
                    <div className="mb-6">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Reset password
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

                        <Button
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-900 transition disabled:opacity-60"
                            type="submit"
                            disabled={submitted}
                        >
                            {submitted ? "Check your Email!" : "Reset"}
                        </Button>
                    </form>

                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Back to{" "}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>

            <div className="hidden md:block w-1/2 relative h-screen">
                <img
                    src="https://i.imgur.com/UPXZRVW.png"
                    alt="Login Image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
}
