import ThemesSettings from "./ThemesSettings"
import WallpaperPanel, { getWallpapers } from "./WallpaperPanel"

interface SettingsContentProps {
    index: number;
    wallpapers: string[];
    onSelectWallpaper: (wallpaper: string) => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ index, wallpapers, onSelectWallpaper }) => {
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