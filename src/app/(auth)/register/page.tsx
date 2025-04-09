"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { UserRegister } from '@/lib/app/user/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import register from '@/lib/app/user/api/register';
import Link from 'next/link';

export default function RegisterPage() {
    const route = useRouter();
    const [userData, setUserData] = useState<UserRegister>({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        role: 'unregistered',
        profile_picture_url: 'pp.jpg',
        summary: '',
        password: '',
    });

    const [error, setError] = useState<string>('');
    const [cfmPassword, setCfmPassword] = useState<string>('');

    useEffect(() => {
        if(userData.password !== cfmPassword){
            setError('Passwords do not match!');
        }
        else{
            setError('');
        }
    }, [userData, cfmPassword]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userData.email || !userData.password){
            setError('Please fill in all fields.');
            return;
        }
        if (error){
            return;
        }

        try{
            setUserData({...userData, username: userData.email});
            const response = await register.post(userData);
            if (response.email){
                route.push('/login');
            }
        }
        catch(error: unknown){
            console.log(error);
            setError('Email already exists.');
        }
    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>

          <Card className="w-full md:w-1/2 flex flex-col border-transparent justify-center px-16">
            <CardHeader>
            <div className="mb-6">
              <Image src="https://cognimate.vercel.app/favicon.svg" alt="Logo" width={50} height={50} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Register an account</h2>
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

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="password"
                  name="cfmPassword"
                  placeholder="Enter password"
                  onChange={(e) => {setCfmPassword(e.target.value)}}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

                {error && (
                    <div className="block text-red-500 text-sm font-medium mb-1">
                        {error}
                    </div>
                )}

              <Button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-900 transition" type="submit">
                Register
              </Button>
            </form>

            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
            </CardContent>
          </Card>

          <div className="hidden md:block w-1/2 relative h-screen">
            <img
              src='https://i.imgur.com/UPXZRVW.png'
              alt="Login Image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
    )
}