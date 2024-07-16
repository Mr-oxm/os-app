"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Search, LayoutGrid, BellRing, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import Image from "next/image";

const pinnedApps = [
    { name: "Edge", icon: "/edge-icon.png" },
    { name: "Word", icon: "/word-icon.png" },
    { name: "Excel", icon: "/excel-icon.png" },
    { name: "PowerPoint", icon: "/powerpoint-icon.png" },
    { name: "Outlook", icon: "/outlook-icon.png" },
    { name: "Teams", icon: "/teams-icon.png" },
    // Add more pinned apps as needed
];

export default function Windows11Taskbar() {
    const { theme } = useIconsStore();
    const [activeIndex, setActiveIndex] = useState(null);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-screen bg-background/80 backdrop-blur-md border-t border-border max-h-14 flex flex-row items-center justify-between px-2"> 
                <div className="flex justify-start w-14">
                </div>

                {/* Center Icons */}
                <div className="flex flex-row items-center h-full py-1">
                    {/* Start Menu */}
                    <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="!p-2 !rounded-md hover:bg-accent/50 border-0 hover:border-2 hover:border-foreground w-10 h-10">
                                <Image 
                                    src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                                    alt="Start"
                                    width={200}
                                    height={200}
                                    className="w-full h-full"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[600px] p-4 rounded-lg" side="top">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <Input placeholder="Type here to search" className="mb-4" />
                                    <h3 className="mb-2 font-semibold">Pinned</h3>
                                    <div className="grid grid-cols-6 gap-2">
                                        {pinnedApps.map((app, index) => (
                                            <Button key={index} variant="ghost" className="flex flex-col items-center p-2">
                                                <img src={app.icon} alt={app.name} className="w-8 h-8 mb-1" />
                                                <span className="text-xs">{app.name}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">Recommended</h3>
                                    {/* Add recommended items here */}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover> 
                    {TaskbarIcons.map((icon, index) => (
                        <Link href={icon.route} 
                            onClick={() => handleClick(index)}
                        > 
                            <Button variant="ghost" className={`p-2 rounded-md hover:bg-accent/50 border-0 hover:border hover:border-foreground w-12 h-12 ${
                                activeIndex === index ? 'bg-accent' : 'hover:bg-accent/50'
                            }`}>
                                <Image 
                                    src={icon.imgSrc[theme]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-7 h-7"
                                />
                            </Button> 
                        </Link> 
                    ))}
                </div>

                {/* Right-side Icons */}
                <div className="flex justify-end w-14"> 

                    {/* System Tray */}
                    <Button variant="ghost" className="flex flex-row gap-2 rounded-md hover:bg-accent/50">
                        <ChevronUp className="w-4 h-4" />
                        <BellRing className="w-4 h-4" />
                        <Wifi className="w-4 h-4" />
                        <Volume2 className="w-4 h-4" />
                        <Battery className="w-4 h-4" />
                    </Button>

                    {/* Date and Time */}
                    <Button variant="ghost" className="text-xs p-1.5 flex flex-col">
                        <span> {new Date().toLocaleTimeString()}</span>
                        <span> {new Date().toLocaleDateString()}</span>
                    </Button>
                </div> 
        </div>
    );
}