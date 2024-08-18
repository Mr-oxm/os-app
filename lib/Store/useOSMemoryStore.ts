import { create } from 'zustand';

interface ProgramInfo {
    id: string;
    name: string;
}

interface OpenedProgram extends ProgramInfo {
    minimized: boolean;
}

interface AppState {
    possiblePrograms: ProgramInfo[];
    openedPrograms: OpenedProgram[];
    openProgram: (id: string) => void;
    closeProgram: (id: string) => void;
    minimizeProgram: (id: string) => void;
    maximizeProgram: (id: string) => void;
    active: string;
    setActive: (id: string) => void;
}

const programInfoCollection: ProgramInfo[] = [
    { id: 'launchpad', name: 'Launchpad'},
    { id: 'settings', name: 'Settings' },
    { id: 'terminal', name: 'Terminal'},
    { id: 'calculator', name: 'Calculator'},
    { id: 'finder', name: 'Finder'},
    { id: 'trash', name: 'Trash'},
    { id: 'player', name: 'Player'},
    { id: 'gallery', name: 'Gallery' },
    { id: 'camera', name: 'Camera'},
    { id: 'music', name: 'Music'},
    { id: 'recorder', name: 'Recorder'},
];

const useOSMemoryStore = create<AppState>((set) => ({
    active: "",
    setActive: (id) => set({ active: id }),
    possiblePrograms: programInfoCollection,
    openedPrograms: [],
    openProgram: (id) => set((state) => {
        const program = state.possiblePrograms.find(p => p.id === id);
        if (program && !state.openedPrograms.some(p => p.id === id)) {
            return { 
                openedPrograms: [...state.openedPrograms, { ...program, minimized: false }],
                active: id
            };
        }
        return {};
    }),
    closeProgram: (id) => set((state) => ({
        openedPrograms: state.openedPrograms.filter(p => p.id !== id)
    })),
    minimizeProgram: (id) => set((state) => ({
        openedPrograms: state.openedPrograms.map(p => 
            p.id === id ? { ...p, minimized: true } : p
        )
    })),
    maximizeProgram: (id) => set((state) => ({
        openedPrograms: state.openedPrograms.map(p => 
            p.id === id ? { ...p, minimized: false } : p
        )
    })),
}));

export default useOSMemoryStore;