"use client";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function JobDetailLoading() {
    return (
        <div className='w-[48rem] mx-auto'>
            <div className='w-full shadow-xl bg-white rounded-lg px-4 py-2'>
                <div className="text-gray-500"><>
                    <div className='flex items-center gap-3'>
                        <Skeleton count={1} circle width={30} height={30}/>
                        <Skeleton count={1} width={150} height={20}/>
                    </div>
                    
                    <div className='mb-2 mt-2'>
                        <Skeleton count={1} height={30}/>
                    </div>
                    <div className='text-sm text-gray-500'>
                        <Skeleton count={1} height={15} width={350}/>
                    </div>
                    <div className='flex mt-2 mb-2 gap-2'>
                        <Skeleton count={1} height={35} width={105} borderRadius="0.95rem"/>
                        <Skeleton count={1} height={35} width={105} borderRadius="0.95rem"/>
                    </div>
                </></div>
            </div>
            <div className={'relative w-full shadow-xl bg-white rounded-lg px-8 py-4 mt-8'}>
                <div className='text-2xl font-bold mb-2'>Description</div>
                    <div>
                        <Skeleton count={1} height={15} width={150}/>
                        <Skeleton count={1} height={15} />
                        <Skeleton count={1} height={15} width={400}/>
                        <Skeleton count={1} height={15} width={600}/>
                        <Skeleton count={2} height={15} />
                        <Skeleton count={1} height={15} width={300}/>
                    </div>
                <div className='h-4'></div>
            </div>
        </div>
    )
}