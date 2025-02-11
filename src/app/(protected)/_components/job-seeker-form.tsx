"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/useUserStore';
import Image from "next/image";

interface JobSeekerFormData {
    username: string;
    first_name: string;
    last_name: string;
    role: 'jobseeker';
    profile_picture_url: string;
}

const initialFormData: JobSeekerFormData = {
    username: '',
    first_name: '',
    last_name: '',
    role: 'jobseeker',
    profile_picture_url: ''
}

export default function JobSeekerForm() {
    const [formData, setFormData] = useState<JobSeekerFormData>(initialFormData);
    const [image, setImage] = useState<string | null>(null);
    const {setUserData} = useUserStore();
    const router = useRouter();

    useEffect(() => {
        setFormData({
            ...formData,
            profile_picture_url: image?image:''
        });
    }, [image])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'profile_picture_url') {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    setImage(base64);
                }
                reader.readAsDataURL(file);
            }
            return;
        }
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserData(formData.username, formData.first_name, formData.last_name, formData.role, formData.profile_picture_url);
        router.push('/');
    }

    return (
        <form className="pt-4" onSubmit={handleSubmit}>
            <div className="text-sm font-bold">Account Details</div>
            <Input 
                placeholder="Username" 
                className="focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-black my-2"
                name="username"
                onChange={handleChange}
                required
                />
            <Input 
                placeholder="First Name" 
                className="focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-black my-2"
                name="first_name"
                onChange={handleChange}
                required
                />
            <Input 
                placeholder="Last Name" 
                className="focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-black my-2"
                name="last_name"
                onChange={handleChange}
                />

            <div className="text-sm mt-8 font-bold">Profile Picture</div>

            <Image src={image?image:"/pp.jpg"} alt="Profile Picture" width={96} height={96} className="rounded-full border mt-4 object-cover aspect-square"/>

            <Input 
                placeholder="Profile Picture" 
                className="focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-black my-2"
                type="file"
                name="profile_picture_url"
                onChange={handleChange}
                />
            

            <button 
                type="submit" 
                className="mt-2 bg-blue-400 py-2 px-6 text-sm rounded-lg text-white hover:bg-blue-500"
                >Submit</button>
        </form>
    )
}