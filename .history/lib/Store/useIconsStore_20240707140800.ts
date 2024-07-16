import {create} from 'zustand';

type IconsTheme = 'Mac' | 'Windows' | 'Linux';

interface IconsStoreState {
    theme: IconsTheme;
    setTheme: (theme: IconsTheme) => void;
}

const useIconsStore = create<IconsStoreState>((set) => ({
    theme: 'Mac', // Set the default theme to 'Mac'
    setTheme: (theme) => set({ theme }),
}));import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type IconsTheme = 'Mac' | 'Windows' | 'Linux';

interface IconsStoreState {
    theme: IconsTheme;
    setTheme: (theme: IconsTheme) => void;
}

const useIconsStore = create<IconsStoreState>()(
    persist(
        (set) => ({
            theme: 'Mac', // Set the default theme to 'Mac'
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'icons-theme-storage', // Name for the storage key
        }
    )
);

export default useIconsStore;

export default useIconsStore;