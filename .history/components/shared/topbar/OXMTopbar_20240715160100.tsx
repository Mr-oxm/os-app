"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { Label } from "@radix-ui/react-context-menu";
import { Battery, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineSignalWifi4Bar,MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaVolumeUp } from "react-icons/fa";
import { RiBatteryFill } from "react-icons/ri";
import { IoIosApps } from "react-icons/io";

const formatDate = (date:Date) => {
    const options:any = { 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };
    return date.toLocaleDateString('en-US', options).replace(',', ',').replace(/:.. /, (match) => match.slice(0, -1));
};

const OXMTopbar = () => {
    const { iconsType, taskbarDir, taskbarPos } = useAppStore();
    const { openProgram, openedPrograms, minimizeProgram, maximizeProgram, active } = useOSMemoryStore();
    const [currentDate, setCurrentDate] = useState(new Date()); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []); 

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    const formattedDate = formatDate(currentDate);
    return (
        <div className={`bg-background/80 backdrop-blur-md flex flex-row justify-between h-6 px-4 py-1 z-50 rounded-full w-[calc(100%-8px)] my-1`}> 
                <div className={`flex justify-start w-1/5 flex-row text-xs font-bold`}>
                <Popover>
                    <PopoverTrigger className="capitalize p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex flex-row h-full gap-2 items-center rounded-md">
                        <IoIosApps /> 
                    </PopoverTrigger>
                    <PopoverContent>
                        
                        <div className="flex flex-col items-center justify-start gap-4">
                            {TaskbarIcons.map((icon, index) => ( 
                                    <Button key={index} onClick={() => handleProgram(icon.id)} variant="ghost" className={`p-1.5 flex flex-row gap-4 border-transparent w-full h-20 group border hover:border-accent/25 hover:bg-accent/40 justify-start ${
                                        openedPrograms.some(p => p.id === icon.id) ? 'bg-accent/40' : 'hover:bg-accent/40'
                                    }`}>
                                        <Image 
                                            src={icon.imgSrc[iconsType]} 
                                            alt={icon.name} 
                                            width={200}
                                            height={200}
                                            className="w-12 h-12 transition-all group-active:h-5 group-active:w-5"
                                        />
                                        <Label>{icon.name}</Label>
                                    </Button> 
                            ))} 
                        </div>
                    </PopoverContent>
                </Popover> 
                </div>

                {/* Center Icons */}
                <div className={`flex flex-row items-center h-full gap-1 text-xs font-bold`}>
                <Popover>
                        <PopoverTrigger className="p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex flex-row h-full gap-2  items-center rounded-md">
                            {formattedDate}
                        </PopoverTrigger>
                        <PopoverContent className="w-fit bg-background/80 backdrop-blur-md mt-3">
                            <Calendar
                                mode="single"
                                selected={currentDate}
                                className="card"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Right-side Icons */}
                <div className={`flex justify-end flex-row w-1/5 h-full`}> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div className={`p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex flex-row h-full gap-2  items-center rounded-md`}>
                                <MdOutlineSignalWifi4Bar />
                                <FaVolumeUp />
                                <RiBatteryFill />
                                <MdOutlinePowerSettingsNew />
                            </div> 
                        </PopoverTrigger>
                        <SystemTrayMenu/>
                    </Popover>
                </div> 
        </div>
    )
}

const sliders = [
    { id: "brightness", label: "Brightness" },
    { id: "volume", label: "Volume" },
];

function SystemTrayMenu() {
    return (
    <PopoverContent className="w-80 card bg-background/80 backdrop-blur-md mb-3 overflow-hidden"> 
        <div>
            {sliders.map(({ id, label }) => (
            <div key={id}>
                <Label className="text-xs">{label}</Label>
                <Slider id={id} className="my-2" />
            </div>
            ))}
        </div> 
        <div className="flex flex-row !text-xs justify-between  items-center">
                <Label className="!text-xs">Battery</Label>
                <Label className="text-foreground/50 !text-xs font-thin">0%</Label>
                
        </div> 
        </PopoverContent>
    );
} 
export default OXMTopbar