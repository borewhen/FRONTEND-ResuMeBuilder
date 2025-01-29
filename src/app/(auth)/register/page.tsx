"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { UserRegister } from '@/lib/app/user/types';
import { useRouter } from 'next/navigation';
import register from '@/lib/app/user/api/register';
import Link from 'next/link';

export default function RegisterPage() {
    const route = useRouter();
    const [userData, setUserData] = useState<UserRegister>({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        role: '',
        profile_picture_url: '',
        summary: '',
        password: '',
    });
    const [error, setError] = useState<boolean>(false);
    const [cfmPassword, setCfmPassword] = useState<string>('');

    useEffect(() => {
        setError(userData.password !== cfmPassword);
    }, [userData, cfmPassword]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await register.post(userData);
        route.push('/login');
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <Card className="w-96 h-96 border-transparent shadow-xl">
                <CardHeader>
                    <h1 className='text-2xl font-bold'>Register</h1>
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
                            className='mb-4 focus-visible:ring-transparent focus-visible:border-black focus-visible:border-2'
                            placeholder='Password' 
                            type='password' 
                            name='password'
                            onChange={handleChange}/>

                        <Input 
                            className='focus-visible:ring-transparent focus-visible:border-black focus-visible:border-2'
                            placeholder='Confirm Password' 
                            type='password' 
                            name='cfmPassword'
                            onChange={(e) => {setCfmPassword(e.target.value)}}/>
                        
                        <div className='text-xs text-red-500'>{error && 'Passwords do not match!'}</div>
                        <Button className='w-full rounded-full mt-8 font-bold' type='submit' disabled={error || userData.email==='' || userData.password===''}>Register</Button>
                        <span className='text-xs font-semibold pl-1 text-gray-500'> Already registered?</span>
                        <Link href='/login' className='text-xs font-semibold hover:underline pl-1 text-blue-500'>Login</Link>
                    </form>
                    
                </CardContent>

            </Card>
        </div>
    )
}