"use client"

import { useState, useEffect } from 'react'
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"

const FullDesktop = ({ children }: { children: any }) => {
    const [wallpaper, setWallpaper] = useState<string>('w_1.jpg')

    useEffect(() => {
        const savedWallpaper = localStorage.getItem('selectedWallpaper')
        if (savedWallpaper) {
            setWallpaper(savedWallpaper)
        }
    }, [])
    const handleWallpaperChange = (newWallpaper: string) => {
        setWallpaper(newWallpaper)
        localStorage.setItem('selectedWallpaper', newWallpaper)
    }

    return (
        <main 
            className="flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <MacTopbar />
            <MainDesktopBody children={children} />
            <MainTaskbar />
        </main>
    )
}

export default FullDesktop