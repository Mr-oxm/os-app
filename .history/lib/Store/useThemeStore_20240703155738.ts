import {create} from 'zustand'; 

interface Theme {
    color: string;
    setColor: (color:string) => void;
}

const useThemeStore = create<Theme>((set) => ({
    theme: 'Mac',
    setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;