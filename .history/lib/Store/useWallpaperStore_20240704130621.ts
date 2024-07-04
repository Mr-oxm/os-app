import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSettings } from '@/lib/Hooks/useSettings';

type WallpaperState = {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
};

export const useWallpaperStore = create<WallpaperState>()(
  persist(
    (set) => {
      const { settings, updateSettings } = useSettings();
      return {
        wallpaper: settings?.wallpaper || 'w_1.jpg',
        setWallpaper: (newWallpaper) => {
          set({ wallpaper: newWallpaper });
          updateSettings({ wallpaper: newWallpaper });
        },
      };
    },
    {
      name: 'wallpaper-storage',
    }
  )
);