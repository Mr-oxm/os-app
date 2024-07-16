import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface AppState {
    firstboot: boolean;
    theme: Theme;
    wallpaper: string;
    iconsType: number;
    topbarType: number;
    taskbarType: number;
    mainbodyType: number;
    windowType: number;
    windowDir: number;
    taskbarDir:number;
    fontType: string;
    cursorType: string;
    bootAnimation: number;

    setFirstboot: (value: boolean) => void;
    setTheme: (value: Theme) => void;
    setWallpaper: (value: string) => void;
    setIconsType: (value: number) => void;
    setTopbarType: (value: number) => void;
    setTaskbarType: (value: number) => void;
    setMainbodyType: (value: number) => void;
    setWindowType: (value: number) => void;
    setWindowDir: (value: number) => void;
    setTaskbarDir: (value: number) => void;
    setFontType: (value: string) => void;
    setCursorType: (value: string) => void;
    setBootAnimation: (value: number) => void;
}

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            firstboot: true,
            theme: 'light',
            wallpaper: 'w_1.jpg',
            iconsType: 0,
            topbarType: 0,
            taskbarType: 0,
            mainbodyType: 0,
            windowType: 0,
            windowDir: 0,
            taskbarDir:0,
            fontType: '',
            cursorType: '',
            bootAnimation: 0,

            setFirstboot: (value) => set({ firstboot: value }),
            setTheme: (value) => set({ theme: value }),
            setWallpaper: (value) => set({ wallpaper: value }),
            setIconsType: (value) => set({ iconsType: value }),
            setTopbarType: (value) => set({ topbarType: value }),
            setTaskbarType: (value) => set({ taskbarType: value }),
            setMainbodyType: (value) => set({ mainbodyType: value }),
            setWindowType: (value) => set({ windowType: value }),
            setWindowDir: (value) => set({ windowDir: value }),
            setTaskbarDir: (value) => set({ windowDir: value }),
            setFontType: (value) => set({ fontType: value }),
            setCursorType: (value) => set({ cursorType: value }),
            setBootAnimation: (value) => set({ bootAnimation: value }),
        }),
        {
            name: 'app-storage', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useAppStore;