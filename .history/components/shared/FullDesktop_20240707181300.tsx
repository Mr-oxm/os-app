"use client"

import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody"
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar"
import MacTopbar from "@/components/shared/topbar/macTopbar"
// import useThemeStore from "@/lib/Store/useThemeStore" 
import Windows11Taskbar from "./taskbar/windowsTaskbar"
import useAppStore from "@/lib/Store/useAppStore"

const FullDesktop = ({ children }: { children: React.ReactNode }) => {
    const wallpaper = useAppStore((state) => state.wallpaper)
    // const theme = useThemeStore((state) => state.color)

    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center }`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <MacTopbar />
            <MainDesktopBody>{children}</MainDesktopBody>
            <MainTaskbar />
            {/* <Windows11Taskbar/> */}
        </main>
    )
}

export default FullDesktop