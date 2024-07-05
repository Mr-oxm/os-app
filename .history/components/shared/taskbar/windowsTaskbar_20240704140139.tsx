"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border">
            <NavigationMenu className="max-w-full mx-auto">
                <NavigationMenuList className="flex items-center justify-between p-1">
                    <div className="flex items-center space-x-2">
                        {/* Start Menu */}
                        <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="p-2 rounded-md hover:bg-accent/50">
                                    <img 
                                        src={theme === 'dark' ? "/windows-11-logo-white.png" : "/windows-11-logo.png"} 
                                        alt="Start" 
                                        className="w-6 h-6"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-4">
                                <h3 className="mb-2 font-semibold">Start Menu</h3>
                                {/* Add your Start Menu content here */}
                            </PopoverContent>
                        </Popover>

                        {/* Search */}
                        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="p-2 rounded-md hover:bg-accent/50">
                                    <img 
                                        src="/search-icon.png" 
                                        alt="Search" 
                                        className="w-6 h-6"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-4">
                                <Input placeholder="Type here to search" className="mb-2" />
                                {/* Add search results here */}
                            </PopoverContent>
                        </Popover>

                        {/* Task View (optional) */}
                        <Button variant="ghost" className="p-2 rounded-md hover:bg-accent/50">
                            <img 
                                src="/task-view-icon.png" 
                                alt="Task View" 
                                className="w-6 h-6"
                            />
                        </Button>
                    </div>

                    {/* Center Icons */}
                    <div className="flex items-center space-x-1">
                        {TaskbarIcons.map((icon, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger
                                    className={`p-2 rounded-md transition-colors ${
                                        activeIndex === index ? 'bg-accent' : 'hover:bg-accent/50'
                                    }`}
                                    onClick={() => handleClick(index)}
                                >
                                    <img 
                                        src={icon.imgSrc[theme]} 
                                        alt={icon.name} 
                                        className="w-6 h-6"
                                    />
                                </NavigationMenuTrigger>
                                {activeIndex === index && (
                                    <NavigationMenuContent>
                                        <div className="p-2">
                                            <Link href={icon.route}>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    {icon.name}
                                                </Button>
                                            </Link>
                                        </div>
                                    </NavigationMenuContent>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </div>

                    {/* Right-side Icons */}
                    <div className="flex items-center space-x-2">
                        {/* Widgets */}
                        <Popover open={isWidgetsOpen} onOpenChange={setIsWidgetsOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="p-2 rounded-md hover:bg-accent/50">
                                    <img 
                                        src="/widgets-icon.png" 
                                        alt="Widgets" 
                                        className="w-6 h-6"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-4">
                                <h3 className="mb-2 font-semibold">Widgets</h3>
                                {/* Add your widgets content here */}
                            </PopoverContent>
                        </Popover>

                        {/* System Tray */}
                        <Button variant="ghost" className="p-2 rounded-md hover:bg-accent/50">
                            <img 
                                src="/system-tray-icon.png" 
                                alt="System Tray" 
                                className="w-6 h-6"
                            />
                        </Button>

                        {/* Date and Time */}
                        <Button variant="ghost" className="text-xs">
                            {new Date().toLocaleTimeString()} <br />
                            {new Date().toLocaleDateString()}
                        </Button>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}