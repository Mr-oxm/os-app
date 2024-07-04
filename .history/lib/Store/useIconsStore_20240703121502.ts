import create from 'zustand';

type IconsTheme = 'Mac' | 'Windows' | 'Linux';

interface IconsStoreState {
  theme: IconsTheme;
  setTheme: (theme: IconsTheme) => void;
}

const useIconsStore = create<IconsStoreState>((set) => ({
  theme: 'Mac', // Set the default theme to 'Mac'
  setTheme: (theme) => set({ theme }),
}));

export default useIconsStore;