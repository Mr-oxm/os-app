"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
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
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Bluetooth, Wifi, Battery, Settings2, Share, Moon, Sun, Copy} from "lucide-react"
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
                                            <NavigationMenuLink>
                                                <SettingsMenu/>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}

                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Battery className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
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

const SettingsMenu= ()=>{
    const settingsIcon=[
        {name:"Wifi", icon:<Wifi/>, status:false},
        {name:"Bluetooth", icon:<Bluetooth/>, status:false},
        {name:"Airdrop", icon:<Share/>, status:false},
    ]
    return(
        <div className="grid grid-cols-4 grid-rows-4 w-full !text-xs gap-2">
            {/* top section  */}
            <div className="flex flex-col gap-4 bgOpacity card row-span-2 col-span-2 ">
                {settingsIcon.map(icon=>(
                <div className="flex flex-row gap-2 items-center">
                    <Toggle className="bgOpacity rounded-full w-10 h-10 p-1 !text-foreground ">
                        {icon.icon}
                    </Toggle>
                    <div className="flex flex-col gap-1 ">
                        <Label className=" !text-xs">{icon.name} </Label>
                        <Label className="!text-xs !font-thin">{icon.status? 'On': 'Off'}</Label>
                    </div>
                </div> 
                ))}
            </div> 
            <div className="col-span-2 row-span-1 bgOpacity card flex flex-row gap-2 items-center">
                <Toggle className="bgOpacity rounded-full w-10 h-10 p-1">
                    <Moon/>
                </Toggle>
                <Label className=" !text-xs">Do Not Disturb</Label>
            </div>

            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Sun/>
                <Label className=" !text-xs text-center">Keyboard Brightness</Label>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Copy/>
                <Label className=" !text-xs text-center">Screen Mirroring</Label>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-start col-span-4 row-span-1 justify-center">
                <Label className=" !text-xs text-center">Display</Label>
                <Slider defaultValue={[33]} max={100} step={1} className="pb-0"/>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-start col-span-4 row-span-1 justify-center">
                <Label className=" !text-xs text-center">Sound</Label>
                <Slider defaultValue={[33]} max={100} step={1} className="pb-0"/>
            </div> 
            
        </div>
    )
}
const wifiMenu= ()=>{
    const settingsIcon=[
        {name:"Wifi", icon:<Wifi/>, status:false},
        {name:"Bluetooth", icon:<Bluetooth/>, status:false},
        {name:"Airdrop", icon:<Share/>, status:false},
    ]
    return(
        <div className="grid grid-cols-4 grid-rows-4 w-full !text-xs gap-2">
            {/* top section  */}
            <div className="flex flex-col gap-4 bgOpacity card row-span-2 col-span-2 ">
                {settingsIcon.map(icon=>(
                <div className="flex flex-row gap-2 items-center">
                    <Toggle className="bgOpacity rounded-full w-10 h-10 p-1 !text-foreground ">
                        {icon.icon}
                    </Toggle>
                    <div className="flex flex-col gap-1 ">
                        <Label className=" !text-xs">{icon.name} </Label>
                        <Label className="!text-xs !font-thin">{icon.status? 'On': 'Off'}</Label>
                    </div>
                </div> 
                ))}
            </div> 
            <div className="col-span-2 row-span-1 bgOpacity card flex flex-row gap-2 items-center">
                <Toggle className="bgOpacity rounded-full w-10 h-10 p-1">
                    <Moon/>
                </Toggle>
                <Label className=" !text-xs">Do Not Disturb</Label>
            </div>

            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Sun/>
                <Label className=" !text-xs text-center">Keyboard Brightness</Label>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Copy/>
                <Label className=" !text-xs text-center">Screen Mirroring</Label>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-start col-span-4 row-span-1 justify-center">
                <Label className=" !text-xs text-center">Display</Label>
                <Slider defaultValue={[33]} max={100} step={1} className="pb-0"/>
            </div> 

            <div className="bgOpacity card flex flex-col gap-2 items-start col-span-4 row-span-1 justify-center">
                <Label className=" !text-xs text-center">Sound</Label>
                <Slider defaultValue={[33]} max={100} step={1} className="pb-0"/>
            </div> 
            
        </div>
    )
}
