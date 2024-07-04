import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WallpaperState = {
    wallpaper: string
    setWallpaper: (wallpaper: string) => void
}

export const useWallpaperStore = create<WallpaperState>()(
    persist(
        (set) => ({
        wallpaper: 'w_1.jpg',
        setWallpaper: (newWallpaper) => set({ wallpaper: newWallpaper }),
        }),
        {
        name: 'wallpaper-storage',
        }
    )
)