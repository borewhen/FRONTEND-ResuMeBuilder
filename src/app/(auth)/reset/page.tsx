"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';


export default function ResetPage() {
    const [email, setEmail] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        setSubmitted(true);
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <Card className="w-96 border-transparent shadow-xl">
                <CardHeader>
                    <h1 className='text-2xl font-bold'>Reset Password</h1>
                    <div className='text-sm'>Please provide your email!</div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input 
                            className='mb-4 focus-visible:ring-transparent focus-visible:border-black focus-visible:border-2' 
                            placeholder='Email'
                            type='email' 
                            name='email'
                            onChange={handleChange}/>
                        <Button className='w-full rounded-full font-bold disabled:bg-blue-500 disabled:opacity-100' type='submit' disabled={submitted}>
                            {submitted? 'Check your Email!': 'Reset Password'}
                        </Button>
                        <span className='text-xs font-semibold pl-1 text-gray-500'> Back to</span>
                        <Link href='/login' className='text-xs font-semibold hover:underline pl-1 text-blue-500'>Login</Link>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}