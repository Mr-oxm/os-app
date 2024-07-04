import {create} from 'zustand'; 

interface ThemeStoreState {
    color: string;
    setColor: (color:string) => void;
}

const useThemeStore = create<ThemeStoreState>((set) => ({
    color: 'Mac',
    setColor: (theme) => set({ theme }),
}));

export default useThemeStore;