import { useState } from 'react';
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody";
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar";
import MacTopbar from "@/components/shared/topbar/macTopbar";
import WallpaperPanel from '@/components/WallpaperPanel';

interface FullDesktopProps {
    children: React.ReactNode;
    initialWallpaper: string;
}

const FullDesktop: React.FC<FullDesktopProps> = ({ children, initialWallpaper }) => {
  const [currentWallpaper, setCurrentWallpaper] = useState(initialWallpaper);
  const [showWallpaperPanel, setShowWallpaperPanel] = useState(false);

  const handleSelectWallpaper = (wallpaper: string) => {
    setCurrentWallpaper(wallpaper);
    setShowWallpaperPanel(false);
  };

  return (
    <main className={`flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-[url('/wallpapers/${currentWallpaper}')] bg-cover bg-center`}>
      <MacTopbar />
      <MainDesktopBody>{children}</MainDesktopBody>
      <MainTaskbar onChangeWallpaper={() => setShowWallpaperPanel(true)} />
      {showWallpaperPanel && <WallpaperPanel onSelectWallpaper={handleSelectWallpaper} />}
    </main>
  );
};

export default FullDesktop;