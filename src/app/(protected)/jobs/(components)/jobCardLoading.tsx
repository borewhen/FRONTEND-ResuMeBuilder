"use client";
import { MapPin, Calendar } from "lucide-react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function JobCardLoading() {
    return (
        <div className={`flex items-center bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer`}>
            <Skeleton width={40} height={40} circle/>
            <div className="ml-4">
                <Skeleton width={100} height={15}/>
                <Skeleton width={300} height={20}/>
                <div className="mt-2">
                    <Skeleton width={180} height={15}/>
                    <Skeleton width={150} height={15}/>
                </div>
            </div>         
        </div>
    )
}