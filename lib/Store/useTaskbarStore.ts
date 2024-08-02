import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SystemAppsIcons } from '@/lib/constants';
import { StaticImageData } from 'next/image';
import useOSMemoryStore from './useOSMemoryStore';

interface TaskbarApp {
    id: string;
    name: string;
    imgSrc: (string | StaticImageData)[];
    route: string;
}

interface TaskbarState {
    appIds: string[];
    unpinnedIds: string[];
    addApp: (id: string) => void;
    removeApp: (id: string) => void;
    TaskbarIcons: TaskbarApp[];
    openProgram: (id: string) => void;
    closeProgram: (id: string) => void;
    setTaskbarIcons: () => void;
}

export const useTaskbarStore = create<TaskbarState>()(
    persist(
        (set, get) => {
            const defaultAppIds = ['launchpad', 'finder', 'terminal', 'settings', 'calculator'];
            
            const initializeTaskbarIcons = () => {
                return SystemAppsIcons.filter((app) => defaultAppIds.includes(app.id));
            };

            return {
                appIds: defaultAppIds,
                unpinnedIds: [],
                TaskbarIcons: initializeTaskbarIcons(),
                
                addApp: (id: string) => {
                    set((state) => ({
                        appIds: Array.from(new Set([...state.appIds, id])),
                        unpinnedIds: Array.from(new Set(state.unpinnedIds.filter((unpinnedId) => unpinnedId !== id))),
                    }))
                    get().setTaskbarIcons();
                },
                
                removeApp: (id: string) => {
                    const osMemoryStore = useOSMemoryStore.getState();
                    if (osMemoryStore.openedPrograms.some(program => program.id === id)) { 
                        set((state) => ({
                            appIds: state.appIds.filter((appId) => appId !== id),
                            unpinnedIds: [...state.unpinnedIds, id], 
                        }))
                    } else {
                        set((state) => ({
                            appIds: state.appIds.filter((appId) => appId !== id),
                        }))
                    }
                    get().setTaskbarIcons();
                },
                
                setTaskbarIcons: () => set((state) => {
                    const pinnedApps = SystemAppsIcons.filter((app) => state.appIds.includes(app.id));
                    const unpinnedApps = state.unpinnedIds.map(id => {
                        const app = SystemAppsIcons.find(app => app.id === id);
                        return app || { id, name: id, imgSrc: ['/default-icon.png'], route: `/${id}` };
                    });
                    return { TaskbarIcons: [...pinnedApps, ...unpinnedApps] };
                }),

                openProgram: (id: string) => {
                    const osMemoryStore = useOSMemoryStore.getState();
                    osMemoryStore.openProgram(id);

                    set((state) => {
                        if (!state.appIds.includes(id) && !state.unpinnedIds.includes(id)) {
                            return { unpinnedIds: [...state.unpinnedIds, id] };
                        }
                        return {};
                    });
                    get().setTaskbarIcons();
                },

                closeProgram: (id: string) => {
                    const osMemoryStore = useOSMemoryStore.getState();
                    osMemoryStore.closeProgram(id);

                    set((state) => ({
                        unpinnedIds: state.unpinnedIds.filter((unpinnedId) => unpinnedId !== id)
                    }));
                    get().setTaskbarIcons();
                },
            };
        },
        {
            name: 'taskbar-storage', 
        }
    )
);