import React from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu" 
import { useTaskbarStore } from '@/lib/Store/useTaskbarStore';
import useOSMemoryStore from '@/lib/Store/useOSMemoryStore';

interface TaskbarContextMenuProps {
    children: React.ReactNode;
    appId: string;
    className?: string; 
    onMouseEnter?:any;
    onMouseLeave?:any;
}

const TaskbarContextMenu: React.FC<TaskbarContextMenuProps> = ({ children, appId, className, onMouseLeave, onMouseEnter }) => {
    const { appIds, addApp, removeApp, openProgram,closeProgram } = useTaskbarStore();
    const { openedPrograms, minimizeProgram, maximizeProgram, active } = useOSMemoryStore();
    const isPinned = appIds.includes(appId);
    const isWorking= openedPrograms.some(program => program.id === appId);

    const handlePin = () => {
        addApp(appId);
    };

    const handleUnpin = () => {
        removeApp(appId);
    };
    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    return (
        <ContextMenu>
        <ContextMenuTrigger onClick={()=>handleProgram(appId)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
            {children} 
        </ContextMenuTrigger>
        <ContextMenuContent className='card bgOpacity bgblur mb-14 text-xs -translate-x-20'>
            {(appId!=='launchpad')&&(isPinned ? (
                <ContextMenuItem className='hover:!bg-foreground/15 active:!bg-primary active:!text-primary-foreground text-xs card !p-2 !border-transparent' onClick={handleUnpin}>Unpin from Taskbar</ContextMenuItem>
                ) : (
                <ContextMenuItem className='hover:!bg-foreground/15 active:!bg-primary active:!text-primary-foreground text-xs card !p-2 !border-transparent' onClick={handlePin}>Pin to Taskbar</ContextMenuItem>
            ))}
            {isWorking? 
                <ContextMenuItem className='hover:!bg-foreground/15 active:!bg-primary active:!text-primary-foreground text-xs card !p-2 !border-transparent' onClick={()=>closeProgram(appId)}>Close App</ContextMenuItem>
                :
                <ContextMenuItem className='hover:!bg-foreground/15 active:!bg-primary active:!text-primary-foreground text-xs card !p-2 !border-transparent' onClick={()=>openProgram(appId)}>Open App</ContextMenuItem>
            }
        </ContextMenuContent>
        </ContextMenu>
    );
};

export default TaskbarContextMenu;