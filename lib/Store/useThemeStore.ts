import {create} from 'zustand'; 

interface ThemeStoreState {
    color: string;
    setColor: (color:string) => void;
}

const useThemeStore = create<ThemeStoreState>((set) => ({
    color: 'dark',
    setColor: (color) => set({ color }),
}));

export default useThemeStore;