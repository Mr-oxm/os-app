"use client"

import { useState, useEffect } from 'react'
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
import Windows11Taskbar from "./taskbar/windowsTaskbar"
import useAppStore from "@/lib/Store/useAppStore"
import Loading from '@/components/shared/Loading' 
import Image from 'next/image'

const FullDesktop = ({ children }: { children: React.ReactNode }) => { 
    const { mainbodyType, taskbarType, topbarType, wallpaper, firstboot} = useAppStore()
    const [isLoading, setIsLoading] = useState(true)
    const [isLocked, setIsLocked] = useState(true)

    useEffect(() => {
        // Simulate page loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000) // Adjust this value based on your actual loading time

        return () => clearTimeout(timer)
    }, [])
    
    const taskBarComponents = [
        <MainTaskbar key="main" />,
        <Windows11Taskbar key="windows11" />, 
    ]
    const topBarComponents = [
        <MacTopbar key="mac" />,
        <></>,
    ]

    if (isLoading) {
        return <Loading />
    }
    
    if(isLocked)return(
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <div className='bgOpacity bgblur w-full h-full flex flex-col items-center justify-center'>
                <Image src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" width={1000} height={1000} className='w-52 h-52 !rounded-full card bgOpacity '/>
            </div>
        </main>
    )
    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            {topBarComponents[topbarType]}
            <MainDesktopBody>{children}</MainDesktopBody>
            {taskBarComponents[taskbarType]}
        </main>
    )
}

export default FullDesktop