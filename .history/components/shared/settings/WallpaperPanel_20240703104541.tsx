"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

const WallpaperPanel = () => {
    const [wallpapers, setWallpapers] = useState<string[]>([])
    const [selectedWallpaper, setSelectedWallpaper] = useState<string>('')

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
        setSelectedWallpaper(wallpaper)
        // Update the wallpaper in localStorage or send to an API
        localStorage.setItem('selectedWallpaper', wallpaper)
        // You might want to add a function to update the parent component here
    }

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-xl font-bold mb-4">Choose Wallpaper</h2>
            <div className="grid grid-cp gap-4">
                {wallpapers.map((wallpaper, index) => (
                    <div 
                        key={index} 
                        className={`relative card bgOpacity cursor-pointer h-48 w-1/5 overflow-hidden ${selectedWallpaper === wallpaper ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => handleWallpaperChange(wallpaper)}
                    >
                        <Image 
                            src={`/wallpapers/${wallpaper}`}
                            alt={`Wallpaper ${index + 1}`}
                            width={200}
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