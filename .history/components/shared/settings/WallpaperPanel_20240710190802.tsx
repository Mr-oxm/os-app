"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWallpaperStore } from '@/lib/Store/useWallpaperStore'
import useAppStore from '@/lib/Store/useAppStore'

const WallpaperPanel = () => {
    const [wallpapers, setWallpapers] = useState<string[]>([])
    const { wallpaper: currentWallpaper, setWallpaper } = useAppStore()

    useEffect(() => {
        // Fetch wallpapers
        const fetchWallpapers = async () => {
            const res = await fetch('/api/wallpapers');
            const data = await res.json();
            setWallpapers(data.wallpapers);
        };
        fetchWallpapers()
    }, [])

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Wallpaper</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-1 max-h-full">
                {wallpapers.map((wallpaper, index) => (
                    <div 
                        key={index} 
                        className={`card bgOpacity cursor-pointer h-48 overflow-hidden hover:ring-2  ${currentWallpaper === wallpaper ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setWallpaper(wallpaper)}
                    >
                        <Image 
                            src={`/wallpapers/${wallpaper}`}
                            alt={`Wallpaper ${index + 1}`}
                            width={300}
                            height={150}
                            className="object-cover card !p-0 w-full h-full !border-0"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WallpaperPanel