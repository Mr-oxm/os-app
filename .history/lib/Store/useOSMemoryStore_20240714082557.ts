// useAppStore.ts
import { create } from 'zustand';
import Settings from '../components/Settings';
import Terminal from '../components/Terminal';
import Calculator from '../components/Calculator';
import Finder from '../components/Finder';

interface Program {
    id: string;
    name: string;
    component: React.ComponentType;
}

interface OpenedProgram extends Program {
    minimized: boolean;
}

interface AppState {
    possiblePrograms: Program[];
    openedPrograms: OpenedProgram[];
    openProgram: (id: string) => void;
    closeProgram: (id: string) => void;
    minimizeProgram: (id: string) => void;
    maximizeProgram: (id: string) => void;
    iconsType: string;
    windowType: number;
    windowDir: number;
}

const useOSMemoryStore = create<AppState>((set) => ({
    possiblePrograms: [
        { id: 'settings', name: 'Settings', component: Settings },
        { id: 'terminal', name: 'Terminal', component: Terminal },
        { id: 'calculator', name: 'Calculator', component: Calculator },
        { id: 'finder', name: 'Finder', component: Finder },
    ],
    openedPrograms: [],
    openProgram: (id) => set((state) => {
        const program = state.possiblePrograms.find(p => p.id === id);
        if (program && !state.openedPrograms.some(p => p.id === id)) {
        return { openedPrograms: [...state.openedPrograms, { ...program, minimized: false }] };
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
    iconsType: 'default',
    windowType: 0,
    windowDir: 0,
}));

export default useOSMemoryStore;