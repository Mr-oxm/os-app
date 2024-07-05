"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";

export default function Windows11Taskbar() {
    const { theme } = useIconsStore();
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index:number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border">
            <NavigationMenu className="max-w-full mx-auto">
                <NavigationMenuList className="flex items-center justify-center space-x-1 p-1">
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
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}