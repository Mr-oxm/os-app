import {create} from 'zustand'; 

interface IconsStoreState {
    color: string;
    setColor: (color:string) => void;
}

const useThemeStore = create<IconsStoreState>((set) => ({
    theme: 'Mac',
    setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;