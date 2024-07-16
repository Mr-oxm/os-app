"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore"; 
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Search, LayoutGrid, BellRing, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import Image from "next/image"; 
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {  Bluetooth, Plane, BatteryLow, Accessibility, Monitor, Moon,  Pencil, Settings } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";


export default function Windows11Taskbar() {
    const { theme } = useIconsStore();
    const [activeIndex, setActiveIndex] = useState(null);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false); 
    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    


    useEffect(() => {
        const timer = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
        setCurrentDate(now.toLocaleDateString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="w-screen bg-background/80 backdrop-blur-md border-t border-border max-h-14 flex flex-row items-center justify-between px-2"> 
                <div className="flex justify-start w-14">
                </div>

                {/* Center Icons */}
                <div className="flex flex-row items-center h-full py-1 gap-1">
                    {/* Start Menu */}
                    <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-2 border-transparent border hover:border-accent/25 hover:hover:bg-accent/40 w-11 h-11">
                                <Image 
                                    src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                                    alt="Start"
                                    width={200}
                                    height={200}
                                    className="w-6 h-6"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit mx p-4 rounded-lg  bg-background/80 backdrop-blur-md mb-3" side="top">
                            <div className="grid grid-rows-3 gap-4 w-full">
                                <div className="col-span-2 w-full">
                                    <Input placeholder="Type here to search" className="mb-4 rounded-full w-full" />
                                    <h3 className="mb-2 font-semibold">Pinned</h3>
                                    <div className="flex flex-row gap-2 h-24 w-full">
                                        {TaskbarIcons.map((icon, index) => (
                                            <Link href={icon.route} 
                                                onClick={() => handleClick(index)}
                                                className="w-1/6 h-20"
                                            > 
                                                <Button variant="ghost" className={`p-6 border-transparent w-full h-full  group border hover:border-accent/25 hover:bg-accent/40 flex flex-col`}  onClick={() => handleClick(index)}>
                                                    <Image 
                                                        src={icon.imgSrc[theme]} 
                                                        alt={icon.name} 
                                                        width={200}
                                                        height={200}
                                                        className="w-12 h-12 transition-all group-active:h-8 group-active:w-8"
                                                    />
                                                    <span className="text-xs">{icon.name}</span>
                                                </Button> 
                                            </Link> 
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">Recommended</h3> 
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover> 
                    {TaskbarIcons.map((icon, index) => (
                        <Link href={icon.route} 
                            onClick={() => handleClick(index)}
                        > 
                            <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40 ${
                                activeIndex === index ? 'bg-accent/40 border-accent/25' : 'hover:bg-accent/40'
                            }`} >
                                <Image 
                                    src={icon.imgSrc[theme]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-full h-full transition-all group-active:h-5 group-active:w-5"
                                />
                            </Button> 
                        </Link> 
                    ))}
                </div>

                {/* Right-side Icons */}
                <div className="flex justify-end w-14"> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div variant="ghost" className="p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex flex-row gap-2">
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
                            <Button variant="ghost" className="text-xs p-1.5 border-transparent  group border hover:border-accent/25 hover:bg-accent/40 flex flex-row gap-2">
                                <div className="flex flex-col">
                                    <span> {currentTime}</span>
                                    <span> {currentDate}</span>
                                </div>
                                <BellRing className="w-4 h-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit bg-background/80 backdrop-blur-md mb-3">
                            <Calendar
                                mode="single"
                                selected={date}
                                
                                className="rounded-md border "
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
    <PopoverContent className="w-80 p-0 bg-background/80 backdrop-blur-md mb-3 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-4">
            {quickSettings.map(({ icon: Icon, label }) => (
            <div className="flex flex-col items-center gap-2">
                <Button key={label} variant="ghost" className="flex flex-col items-center justify-center h-12 p-1.5  border border-accent/25 bg-accent/40 w-full">
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

