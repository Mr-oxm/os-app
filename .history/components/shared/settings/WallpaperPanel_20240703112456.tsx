"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

const WallpaperPanel = ({ onWallpaperChange, currentWallpaper }: { onWallpaperChange: (wallpaper: string) => void, currentWallpaper: string }) => {
    const [wallpapers, setWallpapers] = useState<string[]>([])

    useEffect(() => {
        // Fetch wallpapers
        const fetchWallpapers = async () => {
            const res = await fetch('/api/wallpapers');
            const data = await res.json();
            setWallpapers(data.wallpapers);
        };
        fetchWallpapers()
    }, [])

    const handleWallpaperChange = (wallpaper: string) => {
        onWallpaperChange(wallpaper)
    }

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Wallpaper</h2>
            <div className="grid grid-cols-4 gap-3 overflow-y-scroll p-1 max-h-full">
                {wallpapers.map((wallpaper, index) => (
                    <div 
                        key={index} 
                        className={`card bgOpacity cursor-pointer h-48 overflow-hidden ${currentWallpaper === wallpaper ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => handleWallpaperChange(wallpaper)}
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