"use client"

import { useState, useEffect } from 'react'
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MacTaskbar from "@/components/shared/taskbar/MacTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
import Windows11Taskbar from "./taskbar/windowsTaskbar"
import useAppStore from "@/lib/Store/useAppStore"
import Loading from '@/components/shared/Loading' 
import MainLockScreen from './lockscreens/MainLockScreen'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card' 
import LinuxTopbar from './topbar/LinuxTopbar'
import LinuxTaskbar from './taskbar/LinuxTaskbar' 
import OXMTaskbar from './taskbar/OXMTaskbar' 
import OXMTopbar from './topbar/OXMTopbar'
import WidgetsDesktopBody from './desktopBody/WidgetsDesktopBody'

// Define types for better readability
type DesktopComponentType = React.ReactElement
type TaskbarComponentType = React.ReactElement
type TopbarComponentType = React.ReactElement | null

const FullDesktop = ({ children }: { children: React.ReactNode }) => { 
    // Extract state from app store
    const { 
        mainbodyType, 
        taskbarType, 
        topbarType, 
        wallpaper, 
        taskbarPos,
        taskbarDir, 
        fontType, 
        sysColor
    } = useAppStore()

    // State for loading and lock screen
    const [isLoading, setIsLoading] = useState(true)
    const [isLocked, setIsLocked] = useState(true)

    // Simulating initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000) // Adjust this value based on your actual loading time

        return () => clearTimeout(timer)
    }, [])

    // Lock screen when tab is not visible
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
    
    // Define available desktop components
    const DesktopComponents: DesktopComponentType[] = [
        <MainDesktopBody key="main">{children}</MainDesktopBody>,
        <WidgetsDesktopBody key="widgets">{children}</WidgetsDesktopBody>, 
    ]

    // Define available taskbar components
    const taskBarComponents: TaskbarComponentType[] = [
        <MacTaskbar key="mac" />,
        <Windows11Taskbar key="windows11" />, 
        <LinuxTaskbar key="linux"/>,
        <OXMTaskbar key="oxm"/>
    ]

    // Define available topbar components
    const topBarComponents: TopbarComponentType[] = [
        <MacTopbar key="mac" />,
        null,
        <LinuxTopbar key="linux"/>,
        <OXMTopbar key="oxm"/>
    ]

    // Define taskbar positions
    const taskbarPosition = [
        taskBarComponents[taskbarType],
        <HoverCard key="hover">
            <HoverCardTrigger className="text-background w-3/5 absolute bottom-0 h-8 rounded-full border-white hover:border-b-8 blur-2xl transition-all z-50" />
            <HoverCardContent className='bg-transparent w-fit border-0 shadow-none h-fit p-0 translate-y-8'>
                {taskBarComponents[taskbarType]} 
            </HoverCardContent>
        </HoverCard>
    ]

    // Show loading screen
    if (isLoading) {
        return <Loading />
    }
    
    // Show lock screen
    if (isLocked) {
        return <MainLockScreen wallpaper={wallpaper} setIsLocked={setIsLocked}/>
    }

    // Determine taskbar direction class
    const getTaskbarDirectionClass = () => {
        switch(taskbarDir) {
            case 0: return "flex-col"
            case 1: return "flex-row"
            case 2: return "flex-row-reverse"
            default: return "flex-col"
        }
    }

    // Main desktop render
    return (
        <main 
            className={`!cursor-macos ${sysColor} flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center ${fontType}`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            {topBarComponents[topbarType]}
            <div className={`flex relative ${getTaskbarDirectionClass()} ${sysColor} flex-grow w-full items-center`}>
                {DesktopComponents[mainbodyType]} 
                {taskbarPosition[taskbarPos]}
            </div>
        </main>
    )
}

export default FullDesktop