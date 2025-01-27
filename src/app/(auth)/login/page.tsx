"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';


export default function LoginPage() {
    const [userData, setUserData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userData);
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <Card className="w-96 h-96 border-transparent shadow-xl">
                <CardHeader>
                    <h1 className='text-2xl font-bold'>Login</h1>
                    <div className='text-sm'>Keep pace with your industry landscape!</div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input 
                            className='mb-4 focus-visible:ring-transparent focus-visible:border-black focus-visible:border-2' 
                            placeholder='Email'
                            type='email' 
                            name='email'
                            onChange={handleChange}/>
                        <Input 
                            className='focus-visible:ring-transparent focus-visible:border-black focus-visible:border-2'
                            placeholder='Password' 
                            type='password' 
                            name='password'
                            onChange={handleChange}/>
                        <Link href='/reset' className='text-xs font-semibold hover:underline pl-1 text-blue-500'> Forget Password?</Link>

                        <Button className='w-full rounded-full mt-4 font-bold' type='submit'>Login</Button>
                        <div className='flex justify-center my-2'>
                            <div className='w-36 h-3 border-b-2'></div>
                            <div className='text-sm mx-3'>or</div>
                            <div className='w-36 h-3 border-b-2'></div>
                        </div>
                        <Link href='/register' className='h-full w-full'>
                            <Button className='w-full rounded-full font-bold' type='button'>
                                Register
                            </Button>
                        </Link>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}