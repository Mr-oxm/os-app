import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface AppState {
    firstboot: boolean;
    theme: Theme;
    wallpaper: string;
    iconsType: string;
    topbarType: string;
    taskbarType: string;
    mainbodyType: string;
    fontType: string;
    cursorType: string;
    bootAnimation: string;

    setFirstboot: (value: boolean) => void;
    setTheme: (value: Theme) => void;
    setWallpaper: (value: string) => void;
    setIconsType: (value: string) => void;
    setTopbarType: (value: string) => void;
    setTaskbarType: (value: string) => void;
    setMainbodyType: (value: string) => void;
    setFontType: (value: string) => void;
    setCursorType: (value: string) => void;
    setBootAnimation: (value: string) => void;
}

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            firstboot: true,
            theme: 'light',
            wallpaper: '',
            iconsType: '',
            topbarType: '',
            taskbarType: '',
            mainbodyType: '',
            fontType: '',
            cursorType: '',
            bootAnimation: '',

            setFirstboot: (value) => set({ firstboot: value }),
            setTheme: (value) => set({ theme: value }),
            setWallpaper: (value) => set({ wallpaper: value }),
            setIconsType: (value) => set({ iconsType: value }),
            setTopbarType: (value) => set({ topbarType: value }),
            setTaskbarType: (value) => set({ taskbarType: value }),
            setMainbodyType: (value) => set({ mainbodyType: value }),
            setFontType: (value) => set({ fontType: value }),
            setCursorType: (value) => set({ cursorType: value }),
            setBootAnimation: (value) => set({ bootAnimation: value }),
        }),
        {
        name: 'app-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useAppStore;