"use client"

import { useState, useEffect } from 'react'
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
import Windows11Taskbar from "./taskbar/windowsTaskbar"
import useAppStore from "@/lib/Store/useAppStore"
import Loading from '@/components/shared/Loading' 
import Image from 'next/image'
import { Label } from '@radix-ui/react-context-menu'
import { Button } from '../ui/button'
import MainLockScreen from './lockscreens/MainLockScreen'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card' 

const FullDesktop = ({ children }: { children: React.ReactNode }) => { 
    const { mainbodyType, taskbarType, topbarType, wallpaper, firstboot, taskbarPos,taskbarDir, fontType} = useAppStore()
    const [isLoading, setIsLoading] = useState(true)
    const [isLocked, setIsLocked] = useState(true)

    useEffect(() => {
        // Simulate page loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000) // Adjust this value based on your actual loading time

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsLocked(true)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])
    
    
    
    const taskBarComponents = [
        <MainTaskbar key="main" />,
        <Windows11Taskbar key="windows11" />, 
    ]
    const topBarComponents = [
        <MacTopbar key="mac" />,
        <></>,
        
    ]
    const taskbarPosition=[
        <>{taskBarComponents[taskbarType]}</>,
        <HoverCard>
            <HoverCardTrigger className={`text-background w-3/5 absolute bottom-0 h-8 rounded-full border-white hover:border-b-8 blur-2xl transition-all `}></HoverCardTrigger>
            <HoverCardContent className='bg-transparent w-fit border-0 shadow-none h-fit p-0'>
                {taskBarComponents[taskbarType]} 
            </HoverCardContent>
        </HoverCard>
    ]

    // if (isLoading) {
    //     return <Loading />
    // }
    
    // if(isLocked)return(
    //     <MainLockScreen wallpaper={wallpaper} setIsLocked={setIsLocked}/>
    // )
    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center ${fontType}`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            {topBarComponents[topbarType]}
            <div className={`flex relative ${taskbarDir==0? "flex-col":( taskbarDir==1? "flex-row":"flex-row-reverse")} flex-grow w-full items-center`}>
                <MainDesktopBody>{children}</MainDesktopBody> 
                {taskbarPosition[taskbarPos]}
                
            </div>
        </main>
    )
}

export default FullDesktop