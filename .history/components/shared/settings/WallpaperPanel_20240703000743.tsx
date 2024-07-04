import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface WallpaperPanelProps {
    onSelectWallpaper: (wallpaper: string) => void;
}

const WallpaperPanel: React.FC<WallpaperPanelProps> = ({ onSelectWallpaper }) => {
  const [wallpapers, setWallpapers] = useState<string[]>([]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      const res = await fetch('/api/wallpapers');
      const data = await res.json();
      setWallpapers(data.wallpapers);
    };

    fetchWallpapers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Wallpaper</h2>
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper}
              className="cursor-pointer hover:opacity-80"
              onClick={() => onSelectWallpaper(wallpaper)}
            >
              <Image
                src={`/wallpapers/${wallpaper}`}
                alt={wallpaper}
                width={200}
                height={150}
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallpaperPanel;