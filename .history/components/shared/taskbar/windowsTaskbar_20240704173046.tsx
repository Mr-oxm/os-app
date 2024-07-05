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
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border h-12">
            <div className="flex items-center justify-between h-full px-2">
                <div className="flex items-center space-x-2">
                    {/* Start Menu */}
                    <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-1.5 rounded-md hover:bg-accent/50">
                                <img 
                                    src={theme === 'dark' ? "/windows-11-logo-white.png" : "/windows-11-logo.png"} 
                                    alt="Start" 
                                    className="w-5 h-5"
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

                    {/* Search */}
                    <Button variant="ghost" className="p-1.5 rounded-md hover:bg-accent/50" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Search className="w-5 h-5" />
                    </Button>

                    {/* Task View */}
                    <Button variant="ghost" className="p-1.5 rounded-md hover:bg-accent/50">
                        <LayoutGrid className="w-5 h-5" />
                    </Button>
                </div>

                {/* Center Icons */}
                <div className="flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                    {TaskbarIcons.map((icon, index) => (
                        <Link href={icon.route}
                            className={` !p-1  transition-colors card b ${
                                activeIndex === index ? 'bg-accent' : 'hover:bg-accent/50'
                            }`}
                            onClick={() => handleClick(index)}
                        >
                            <Image 
                                src={icon.imgSrc[theme]} 
                                alt={icon.name} 
                                width={200}
                                height={200}
                                className="w-8 h-8"
                            />
                        </Link> 
                    ))}
                </div>

                {/* Right-side Icons */}
                <div className="flex items-center space-x-2">
                    {/* Widgets */}
                    <Button variant="ghost" className="p-1.5 rounded-md hover:bg-accent/50" onClick={() => setIsWidgetsOpen(!isWidgetsOpen)}>
                        <img 
                            src="/widgets-icon.png" 
                            alt="Widgets" 
                            className="w-5 h-5"
                        />
                    </Button>

                    {/* System Tray */}
                    <Button variant="ghost" className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-accent/50">
                        <ChevronUp className="w-4 h-4" />
                        <BellRing className="w-4 h-4" />
                        <Wifi className="w-4 h-4" />
                        <Volume2 className="w-4 h-4" />
                        <Battery className="w-4 h-4" />
                    </Button>

                    {/* Date and Time */}
                    <Button variant="ghost" className="text-xs p-1.5">
                        {new Date().toLocaleTimeString()} <br />
                        {new Date().toLocaleDateString()}
                    </Button>
                </div>
            </div>
        </div>
    );
}