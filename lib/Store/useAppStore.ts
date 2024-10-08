import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface AppState {
    firstboot: boolean;
    sysTheme: string;
    sysColor:string;
    wallpaper: string;
    iconsType: number;
    topbarType: number;
    taskbarType: number;
    mainbodyType: number;
    windowType: number;
    windowDir: number;
    taskbarDir:number;
    taskbarPos:number;
    fontType: string;
    cursorType: string;
    bootAnimation: number;

    setFirstboot: (value: boolean) => void;
    setSysTheme: (value: string) => void;
    setSysColor: (value: string) => void;
    setWallpaper: (value: string) => void;
    setIconsType: (value: number) => void;
    setTopbarType: (value: number) => void;
    setTaskbarType: (value: number) => void;
    setMainbodyType: (value: number) => void;
    setWindowType: (value: number) => void;
    setWindowDir: (value: number) => void;
    setTaskbarDir: (value: number) => void;
    setTaskbarPos: (value: number) => void;
    setFontType: (value: string) => void;
    setCursorType: (value: string) => void;
    setBootAnimation: (value: number) => void;
}

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            firstboot: true,
            sysTheme: 'dark',
            sysColor:'blue-theme',
            wallpaper: 'os_1.png',
            iconsType: 3,
            topbarType: 3,
            taskbarType: 3,
            mainbodyType: 0,
            windowType: 3,
            windowDir: 1,
            taskbarDir:0,
            taskbarPos:0,
            fontType: 'font-sans',
            cursorType: '',
            bootAnimation: 3,

            setFirstboot: (value) => set({ firstboot: value }),
            setSysTheme: (value) => set({ sysTheme: value }),
            setSysColor: (value) => set({ sysColor: value }),
            setWallpaper: (value) => set({ wallpaper: value }),
            setIconsType: (value) => set({ iconsType: value }),
            setTopbarType: (value) => set({ topbarType: value }),
            setTaskbarType: (value) => set({ taskbarType: value }),
            setMainbodyType: (value) => set({ mainbodyType: value }),
            setWindowType: (value) => set({ windowType: value }),
            setWindowDir: (value) => set({ windowDir: value }),
            setTaskbarDir: (value) => set({ taskbarDir: value }),
            setTaskbarPos: (value) => set({ taskbarPos: value }),
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