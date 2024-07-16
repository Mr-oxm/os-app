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
import useAppStore from "@/lib/Store/useAppStore";
import Apple from '@/components/icons/apple'
import osicon from '@/public/icons/os_icon.svg'


export default function LinuxTaskbar() {
    const { iconsType, taskbarDir, taskbarPos } = useAppStore();
    const [activeIndex, setActiveIndex] = useState(null); 

    const handleClick = (index:any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    



    return (
        <div className={` !border-0 bg-background/80 bgblur card flex ${taskbarDir===0? "flex-row max-h-14 !p-2 w-fit":"flex-col-reverse h-full w-14 px-1 py-2 !rounded-none"} items-center justify-between md:justify-between ${taskbarPos===0?"":"rounded-2xl"}`}>
                <Image 
                            src={osicon} 
                            alt={TaskbarIcons[0].name} 
                            width={200}
                            height={200}
                            className="w-full h-full transition-all fill-foreground"
                        />
                <Link href={TaskbarIcons[0].route} 
                        > 
                    <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40
                    }`} >
                        <Image 
                            src={TaskbarIcons[0].imgSrc[iconsType]} 
                            alt={TaskbarIcons[0].name} 
                            width={200}
                            height={200}
                            className="w-full h-full transition-all"
                        />
                    </Button> 
                </Link> 
                <div className={`flex ${taskbarDir===0? "flex-row h-full":"flex-col w-full justify-center"} items-center gap-1`}>
                    
                    {TaskbarIcons.map((icon, index) => ( 
                        (icon.name!=="Launchpad")&&
                        <Link href={icon.route} 
                            onClick={() => handleClick(index)}
                        > 
                            <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40 ${
                                activeIndex === index ? 'bg-accent/40 border-accent/25' : 'hover:bg-accent/40'
                            }`} >
                                <Image 
                                    src={icon.imgSrc[iconsType]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-full h-full transition-all"
                                />
                            </Button> 
                        </Link>
                    ))}
                </div> 
        </div>
    );
} 

