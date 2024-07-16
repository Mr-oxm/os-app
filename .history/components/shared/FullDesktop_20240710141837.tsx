"use client"

import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
// import useThemeStore from "@/lib/Store/useThemeStore" 
import Windows11Taskbar from "./taskbar/windowsTaskbar"
import useAppStore from "@/lib/Store/useAppStore"
import { redirect } from "next/navigation"

const FullDesktop = ({ children }: { children: React.ReactNode }) => { 
    const { mainbodyType, taskbarType, topbarType, wallpaper, firstboot} = useAppStore()

    if(!firstboot) redirect('/loading')
    // const theme = useThemeStore((state) => state.color)
    
    const taskBarComponents = [
        <MainTaskbar />,
        <Windows11Taskbar />, 
    ]
    const topBarComponents = [
        <MacTopbar />,
        <></>,
    ]
    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center }`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            {topBarComponents[topbarType]}
            <MainDesktopBody>{children}</MainDesktopBody>
            {taskBarComponents[taskbarType]}
        </main>
    )
}

export default FullDesktop