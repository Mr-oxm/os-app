"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { TaskbarIcons } from "@/lib/constants";
import Image from "next/image"; 
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

export default function LinuxTaskbar() {
    const { iconsType, taskbarDir, taskbarPos } = useAppStore();
    const { openProgram, openedPrograms, minimizeProgram, maximizeProgram } = useOSMemoryStore();

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    return (
        <div className={`!border-0 bg-background/80 bgblur card flex ${taskbarDir===0 ? "flex-row max-h-14 !p-2 w-fit" : "flex-col-reverse h-full w-14 px-1 py-2"} items-center justify-between md:justify-between ${taskbarPos===0 ? "" : "rounded-2xl"}`}> 
            <div onClick={() => handleProgram(TaskbarIcons[0].id)}>
                <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40`}>
                    <Image 
                        src={TaskbarIcons[0].imgSrc[iconsType]} 
                        alt={TaskbarIcons[0].name} 
                        width={200}
                        height={200}
                        className="w-full h-full transition-all"
                    />
                </Button> 
            </div>
            <div className={`flex ${taskbarDir===0 ? "flex-row h-full" : "flex-col w-full justify-center"} items-center gap-1`}>
                {TaskbarIcons.map((icon, index) => ( 
                    icon.name !== "Launchpad" && (
                        <div key={index} onClick={() => handleProgram(icon.id)}>
                            <Button 
                                variant="ghost" 
                                className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40 ${
                                    openedPrograms.some(p => p.id === icon.id) ? 'bg-accent/40 border-accent/25' : 'hover:bg-accent/40'
                                }`}
                            >
                                <Image 
                                    src={icon.imgSrc[iconsType]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-full h-full transition-all"
                                />
                            </Button> 
                        </div>
                    )
                ))}
            </div> 
        </div>
    );
}