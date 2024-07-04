import {create} from 'zustand'; 

interface IconsStoreState {
    color: IconsTheme;
    setTheme: (theme: IconsTheme) => void;
}

const useIconsStore = create<IconsStoreState>((set) => ({
    theme: 'Mac', // Set the default theme to 'Mac'
    setTheme: (theme) => set({ theme }),
}));

export default useIconsStore;