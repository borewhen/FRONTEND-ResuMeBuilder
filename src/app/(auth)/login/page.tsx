"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import login from '@/lib/app/user/api/login';
import Link from 'next/link';

interface UserLoginData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserLoginData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userData.email || !userData.password){
            setError('Please fill in all fields');
            return;
        }

        const response = await login.post(userData);

        if (response.access_token){
            router.push('/');
        }
        else{
            setError('Invalid email or password');
        }
    }

    return (
        <div className='h-full w-full bg-dip-40 flex justify-center items-center'>
            <Card className="w-96 bg-dip-20 border-transparent shadow-xl">
                <CardHeader>
                    <h1 className='text-2xl font-bold text-dip-100'>Login</h1>
                    <div className='text-sm text-dip-blk'>Keep pace with your industry landscape!</div>
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
                        {
                            error && <div className='text-red-500 text-xs pl-1 font-bold mt-1'>{error}</div>
                        }
                        

                        <Button className='w-full rounded-full mt-4 font-bold text-dip-100' type='submit'>Login</Button>
                        <div className='flex justify-center my-2'>
                            <div className='w-36 h-3 border-b-2'></div>
                            <div className='text-sm mx-3'>or</div>
                            <div className='w-36 h-3 border-b-2'></div>
                        </div>
                        <Link href='/register' className='h-full w-full'>
                            <Button className='w-full rounded-full font-bold text-dip-100' type='button'>
                                Register
                            </Button>
                        </Link>
                        <div className='w-full mt-2 text-dip-100'>
                            <Link href='/reset' className='text-xs font-semibold hover:underline pl-1 text-gray-400'> Forgot Password?</Link>
                        </div>
                        
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}