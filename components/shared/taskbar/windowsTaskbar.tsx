"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {  BellRing, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import Image from "next/image"; 
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Bluetooth, Plane, BatteryLow, Accessibility, Monitor, Moon, Pencil, Settings } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import Apple from '@/components/icons/apple'
import OXMIcon2 from "@/components/icons/OXMIcon2";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
import { SystemAppsIcons } from "@/lib/constants";
import TaskbarContextMenu from "./TaskbarContextMenu";

export default function Windows11Taskbar() {
    const { iconsType, taskbarDir, taskbarPos } = useAppStore();
    const {TaskbarIcons, openProgram}= useTaskbarStore();
    const { openedPrograms, minimizeProgram, maximizeProgram } = useOSMemoryStore();
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false); 
    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(now.toLocaleDateString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const windowsButtonIcons=[
        <span className="w-5 h-5">
            <Apple/>
        </span>,
        <Image 
            src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
            alt="Start"
            width={200}
            height={200}
            className="w-6 h-6"
        />,
        <Image 
            src={'https://brandslogos.com/wp-content/uploads/images/large/linux-tux-logo-1.png'} 
            alt="Start"
            width={200}
            height={200}
            className="w-7 h-7"
        />, 
        <span className="w-5 ">
            <OXMIcon2/>
        </span>,
    ]

    return (
        <div className={`bg-background/80 backdrop-blur-md flex ${taskbarDir===0? "flex-row max-h-14 px-2 w-screen py-1 border-t border-border":"flex-col h-full w-14 px-1 py-2 border-x border-border"} items-center justify-center md:justify-between ${taskbarPos===0?"":"rounded-2xl w-[90vw] z-50"}`}> 
            <div className={`hidden md:flex justify-start ${taskbarDir===0? "w-1/5 flex-row":"h-1/5 flex-col"}`}>
            </div>

            {/* Center Icons */}
            <div className={`flex ${taskbarDir===0? "flex-row h-full":"flex-col w-full justify-center"} items-center h-full gap-1`}>
                {/* Start Menu */}
                <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="p-2 border-transparent border hover:border-accent/25 hover:hover:bg-accent/40 w-11 h-11">
                            {windowsButtonIcons[iconsType]}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-screen md:w-fit p-4 rounded-lg  bg-background/80 backdrop-blur-md mb-3" side="top">
                        <div className="flex flex-col h-fit md:h-96 gap-4 w-auto">
                            <div className="col-span-3 w-full">
                                <Input placeholder="Type here to search" className="mb-4 rounded-full w-full" />
                                <h3 className="mb-2 font-semibold">Pinned</h3>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2  w-full">
                                    {SystemAppsIcons.map((icon, index) => (
                                        <div key={index} className=" h-20">
                                            <Button 
                                                variant="ghost" 
                                                className={`p-6 border-transparent w-full h-full group border hover:border-accent/25 hover:bg-accent/40 flex flex-col gap-2`}  
                                                onClick={() => handleProgram(icon.id)}
                                            >
                                                <Image 
                                                    src={icon.imgSrc[iconsType]} 
                                                    alt={icon.name} 
                                                    width={200}
                                                    height={200}
                                                    className="w-12 h-12 transition-all group-active:h-8 group-active:w-8"
                                                />
                                                <span className="text-xs">{icon.name}</span>
                                            </Button> 
                                        </div>
                                    ))}
                                </div>
                            </div> 
                        </div>
                    </PopoverContent>
                </Popover> 
                {TaskbarIcons.map((icon, index) => (
                    <TaskbarContextMenu appId={icon.id} key={index}>
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
                                className="w-full h-full transition-all group-active:h-5 group-active:w-5"
                            />
                        </Button> 
                    </TaskbarContextMenu>
                ))}
            </div>

            {/* Right-side Icons */}
            <div className={`hidden md:flex ${taskbarDir===0? "flex-row w-1/5 h-full":"flex-col h-1/5 w-full"} justify-end`}> 
                <Popover>
                    <PopoverTrigger>
                        {/* System Tray */}
                        <div className={`p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex ${taskbarDir===0? "flex-row h-full":"flex-col w-full"} gap-2  items-center rounded-md`}>
                            <ChevronUp className="w-4 h-4" />
                            <Wifi className="w-4 h-4" />
                            <Volume2 className="w-4 h-4" />
                            <Battery className="w-4 h-4" />
                        </div> 
                    </PopoverTrigger>
                    <SystemTrayMenu/>
                </Popover>

                <Popover>
                    <PopoverTrigger>
                        {/* Date and Time */}
                        <div className={`text-xs p-1.5 border-transparent  group border hover:border-accent/25 hover:bg-accent/40 flex ${taskbarDir===0? "flex-row":"flex-col"} gap-2 items-center rounded-md justify-center`}>
                            <div className={`flex flex-col text-right ${taskbarDir===0? "text-right ":"scale-75"}`}>
                                <span> {currentTime}</span>
                                <span> {currentDate}</span>
                            </div>
                            <BellRing className="w-4 h-4" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit bg-background/80 backdrop-blur-md mb-3 mr-2">
                        <Calendar
                            mode="single"
                            selected={date}
                            className="card "
                        />
                    </PopoverContent>
                </Popover>
            </div> 
        </div>
    );
} 


const quickSettings = [
    { icon: Wifi, label: "Wi-Fi" },
    { icon: Bluetooth, label: "Bluetooth" },
    { icon: Plane, label: "Airplane mode" },
    { icon: BatteryLow, label: "Battery saver" },
    { icon: Accessibility, label: "Accessibility" },
    { icon: Monitor, label: "Project" },
    { icon: Moon, label: "Night light" },
];

const sliders = [
    { id: "brightness", label: "Brightness" },
    { id: "volume", label: "Volume" },
];

function SystemTrayMenu() {
    return (
    <PopoverContent className="w-80 p-0 bg-background/80 backdrop-blur-md mb-3 overflow-hidden mr-2">
        <div className="grid grid-cols-3 gap-2 p-4">
            {quickSettings.map(({ icon: Icon, label }) => (
            <div className="flex flex-col items-center gap-2" key={label}>
                <Button  variant="ghost" className="flex flex-col items-center justify-center h-12 p-1.5  border border-accent/25 bg-accent/40 w-full">
                    <Icon className="h-4 w-4" />
                </Button>
                <span className="text-xs">{label}</span>
            </div>
            ))}
        </div> 
        <div className="p-4">
            {sliders.map(({ id, label }) => (
            <div key={id}>
                <Label htmlFor={id} className="text-xs">{label}</Label>
                <Slider id={id} className="my-2" />
            </div>
            ))}
        </div> 
        <div className="px-4 py-1 flex items-center justify-between bg-background">
            <div className="flex items-center">
                <Battery className="h-6 w-6 mr-2" />
                <span className="text-sm">0%</span>
            </div>
            <div className="flex space-x-2">
                {[Pencil, Settings].map((Icon, index) => (
                    <Button key={index} variant="ghost" size="icon">
                        <Icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>
        </div>
        </PopoverContent>
    );
}

