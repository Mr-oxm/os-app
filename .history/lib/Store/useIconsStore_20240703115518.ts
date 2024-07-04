import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TaskbarIcons } from '@/lib/constants'

type IconTheme = 'Mac' | 'Windows' | 'Linux'

type IconsState = {
    theme: IconTheme
    icons: typeof TaskbarIcons
    setTheme: (theme: IconTheme) => void
}

export const useIconsStore = create<IconsState>()(
  persist(
    (set) => ({
      theme: 'Mac',
      icons: TaskbarIcons,
      setTheme: (newTheme) => set((state) => ({
        theme: newTheme,
        icons: state.icons.map(icon => ({
          ...icon,
          imgSrc: icon.imgSrc[newTheme]
        }))
      })),
    }),
    {
      name: 'icons-storage',
    }
  )
)