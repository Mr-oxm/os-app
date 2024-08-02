"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon"; 
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
import TaskbarContextMenu from "./TaskbarContextMenu";

export default function MainTaskbar() { 
    const { iconsType, taskbarDir } = useAppStore();
    const {TaskbarIcons,openProgram}= useTaskbarStore();
    const { openedPrograms, minimizeProgram, maximizeProgram } = useOSMemoryStore();
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index:any) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconClass = (index:any) => {
        const baseClass = "transition-all duration-300 ease-in-out";
        if (hoverIndex === null) return baseClass;
        const diff = Math.abs(index - hoverIndex);
        if (diff === 0) return `${baseClass} !scale-[2] ${taskbarDir === 0 ? " px-2 mx-2" : "my-2 py-2"}`;
        if (diff === 1) return `${baseClass} !scale-[1.5] ${taskbarDir === 0 ? "mb-4 px-4" : "my-4"}`;
        if (diff === 2) return `${baseClass} !scale-[1.25] ${taskbarDir === 0 ? "mb-2 px-2" : "my-2"}`;
        return baseClass;
    }; 

    return (
        <div className={`ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex ${taskbarDir === 0 ? "flex-row h-12" : "flex-col w-12"}  gap-2  transition-all card z-50 group/show `}>
            {TaskbarIcons.map((icon, index) => (
                <TaskbarContextMenu appId={icon.id}
                    key={index}
                    className={`${getIconClass(index)} flex items-center justify-center relative ${taskbarDir === 0 ?'hover:-translate-y-6 ': (taskbarDir==1?'hover:-translate-x-2':'hover:translate-x-2')}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <DockDesktopIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    <span className={`${
                        openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'
                    } absolute group-hover/show:opacity-0 opacity-100 transition-all -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-foreground rounded-full`}></span> 
                </TaskbarContextMenu>
            ))}
        </div>
    );
}