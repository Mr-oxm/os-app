import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TaskbarIcons } from '@/lib/constants'

type IconTheme = 'Mac' | 'Windows' | 'Linux'

interface IconData {
  imgSrc: {
    [key in IconTheme]: string;
  };
  name: string;
  route: string;
}

type IconsState = {
  theme: IconTheme
  icons: IconData[]
  setTheme: (theme: IconTheme) => void
}

export const useIconsStore = create<IconsState>()(
  persist(
    (set) => ({
      theme: 'Mac' as IconTheme,
      icons: TaskbarIcons,
      setTheme: (newTheme: IconTheme) => set((state) => ({
        theme: newTheme,
        icons: state.icons.map(icon => ({
          ...icon,
          imgSrc: icon.imgSrc[newTheme] || icon.imgSrc['Mac'] // Fallback to Mac if the theme doesn't exist
        }))
      })),
    }),
    {
      name: 'icons-storage',
    }
  )
)