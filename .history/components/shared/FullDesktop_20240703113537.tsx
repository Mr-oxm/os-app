"use client"

import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
import { useWallpaperStore } from '@/useWallpaperStore'

const FullDesktop = ({ children }: { children: React.ReactNode }) => {
    const wallpaper = useWallpaperStore((state) => state.wallpaper)

    return (
        <main 
            className="flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <MacTopbar />
            <MainDesktopBody>{children}</MainDesktopBody>
            <MainTaskbar />
        </main>
    )
}

export default FullDesktop