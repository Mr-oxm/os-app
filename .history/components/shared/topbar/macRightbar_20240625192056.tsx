"use client"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,

} from "@/components/ui/navigation-menu"
import { Bluetooth, Wifi, Battery, Settings2} from "lucide-react"
import { useEffect, useState } from "react";

const formatDate = (date:Date) => {
    const options:any = { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/:.. /, (match) => match.slice(0, -1));
};

const macRightbar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = formatDate(currentDate);

    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                    <NavigationMenuList className="flex flex-row-reverse p-0 h-full">
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    {formattedDate}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 text-foreground">
                                            <NavigationMenuLink >
                                                <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                    
                                                </Button>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Settings2 className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 text-foreground">
                                            <NavigationMenuLink className="grid grid-cols-2 grid-rows-5">
                                                
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}

                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Battery className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 text-foreground">
                                            <NavigationMenuLink >
                                                <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                    
                                                </Button>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Bluetooth className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 text-foreground">
                                            <NavigationMenuLink >
                                                <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                    
                                                </Button>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Wifi className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 text-foreground">
                                            <NavigationMenuLink >
                                                <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                    
                                                </Button>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
export default macRightbar

const seetingsMenu= ()=>{

}