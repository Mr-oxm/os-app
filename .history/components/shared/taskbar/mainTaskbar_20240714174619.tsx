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

    const handleMouseEnter = (index:any) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconClass = (index:any) => {
        if (hoverIndex === null) return "";
        if (index === hoverIndex) return `scale-[2] ${taskbarDir === 0 ? "mb-6 mx-4" : "my-4"}`;
        if (index === hoverIndex - 1 || index === hoverIndex + 1) return `scale-[1.75] ${taskbarDir === 0 ? "mb-4 mx-4" : "my-4"}`;
        if (index === hoverIndex - 2 || index === hoverIndex + 2) return `scale-[1.5] ${taskbarDir === 0 ? "mb-2 mx-2" : "my-2"}`;
        return "";
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
        <div className={`ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex ${taskbarDir === 0 ? "flex-row h-12" : "flex-col w-12"}  gap-2  transition-all card z-50 group/show z-50`}>
            {TaskbarIcons.map((icon, index) => (
                <div
                    key={index}
                    onClick={() => handleProgram(icon.id)}
                    className={`transition-all ease-linear relative duration-100 ${getIconClass(index)}`}
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