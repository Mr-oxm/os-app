"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

export default function MainTaskbar() { 
    const { iconsType, taskbarDir } = useAppStore();
    const { openProgram, openedPrograms, minimizeProgram, maximizeProgram } = useOSMemoryStore();
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconClass = (index) => {
        const baseClass = "transition-all duration-300 ease-in-out";
        if (hoverIndex === null) return `${baseClass} scale-200`;
        const diff = Math.abs(index - hoverIndex);
        if (diff === 0) return `${baseClass} scale-200 ${taskbarDir === 0 ? "mb-6" : "mx-6"}`;
        if (diff === 1) return `${baseClass} scale-150 ${taskbarDir === 0 ? "mb-4" : "mx-4"}`;
        if (diff === 2) return `${baseClass} scale-125 ${taskbarDir === 0 ? "mb-2" : "mx-2"}`;
        return `${baseClass} `;
    };

    const handleProgram = (id) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    return (
        <div className={`ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex ${taskbarDir === 0 ? "flex-row h-12" : "flex-col w-12"}  gap-2  transition-all card z-50 group/show `}>
            {TaskbarIcons.map((icon, index) => (
                <div
                    key={index}
                    onClick={() => handleProgram(icon.id)}
                    className={getIconClass(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <DockDesktopIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    <span className={`${
                        openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'
                    } absolute group-hover/show:opacity-0 opacity-100 transition-all -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-foreground rounded-full`}></span>
                </div>
            ))}
        </div>
    );
}