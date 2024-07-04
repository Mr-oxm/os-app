import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface WallpaperPanelProps {
    wallpapers: string[];
    onSelectWallpaper: (wallpaper: string) => void;
}

export async function getWallpapers() {
    const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers');
    return fs.readdirSync(wallpaperDir);
}

const WallpaperPanel: React.FC<WallpaperPanelProps> = ({ wallpapers, onSelectWallpaper }) => {
  return (
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
  );
};

export default WallpaperPanel;