import { useState, useEffect } from 'react';
import ThemesSettings from "./ThemesSettings"
import WallpaperPanel, { getWallpapers } from "./WallpaperPanel"

const SettingsContent = ({ index, onSelectWallpaper }: { index: number, onSelectWallpaper: (wallpaper: string) => void }) => {
  const [wallpapers, setWallpapers] = useState<string[]>([]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      const wallpaperList = await getWallpapers();
      setWallpapers(wallpaperList);
    };
    fetchWallpapers();
  }, []);

  const components = [
    <ThemesSettings key="themes" />,
    <WallpaperPanel key="wallpaper" wallpapers={wallpapers} onSelectWallpaper={onSelectWallpaper} />
  ]

  return (
    <div>
      {components[index] || <div>No component found for this index</div>}
    </div>
  )
}

export default SettingsContent