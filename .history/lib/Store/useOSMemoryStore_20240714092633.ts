// useAppStore.ts
import { create } from 'zustand';
import SettingsApp from '@/components/shared/fullPrograms/SettingsApp';
import TerminalApp from '@/components/shared/fullPrograms/TerminalApp';
import CalculatorApp from '@/components/shared/fullPrograms/CalculatorApp';
import FinderApp from '@/components/shared/fullPrograms/FinderApp';

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
    active:string;
    setActive: (id: string) => void;
}

const useOSMemoryStore = create<AppState>((set) => ({
    possiblePrograms: [
        { id: 'settings', name: 'Settings', component: SettingsApp },
        { id: 'terminal', name: 'Terminal', component: TerminalApp },
        { id: 'calculator', name: 'Calculator', component: CalculatorApp },
        { id: 'finder', name: 'Finder', component: FinderApp },
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
    active:"",
    setActive: (id)=>set(() => ({
        active:id
    }))
}));

export default useOSMemoryStore;