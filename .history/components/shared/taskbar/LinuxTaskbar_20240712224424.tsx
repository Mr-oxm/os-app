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


export default function LinuxTaskbar() {
    const { iconsType, setIconsType, taskbarDir, taskbarPos } = useAppStore();
    const [activeIndex, setActiveIndex] = useState(null);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false); 
    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const handleClick = (index:any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    


    useEffect(() => {
        const timer = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setCurrentDate(now.toLocaleDateString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const linuxButtonIcons=[
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
    ]
    return (
        <div className={` bg-background/80 bgblur card flex ${taskbarDir===0? "flex-row max-h-14 !p-2 w-fit":"flex-col-reverse h-full w-14 px-1 py-2 round"} items-center justify-between md:justify-between ${taskbarPos===0?"":"rounded-2xl w-[90vw]"}`}> 
                <Link href={TaskbarIcons[0].route} 
                        > 
                    <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40
                    }`} >
                        <Image 
                            src={TaskbarIcons[0].imgSrc[iconsType]} 
                            alt={TaskbarIcons[0].name} 
                            width={200}
                            height={200}
                            className="w-full h-full transition-all group-active:h-5 group-active:w-5"
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
                                    className="w-full h-full transition-all group-active:h-5 group-active:w-5"
                                />
                            </Button> 
                        </Link>
                    ))}
                </div> 
        </div>
    );
} 

