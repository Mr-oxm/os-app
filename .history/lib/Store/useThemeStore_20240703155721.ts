import {create} from 'zustand'; 

interface IconsStoreState {
    color: string;
    setColor: (color:string) => void;
}

const useThemeStore = create<IconsStoreState>((set) => ({
    theme: 'Mac', // Set the default theme to 'Mac'
    setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;