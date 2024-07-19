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
import { Switch } from "@/components/ui/switch";
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

    const formattedDate = currentDate ? formatDate(currentDate) : '';

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
                                                <DateMenu/> 
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Settings2 className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-6 md:w-80 text-foreground">
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
                                                <BatteryMenu/>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40 hidden md:block"> 
                                    <Bluetooth className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground">
                                            <NavigationMenuLink > 
                                                    <BlueMenu/> 
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                    {/*------------ item end---------- */}
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40 hidden md:block"> 
                                    <Wifi className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-80 text-foreground ">
                                            <NavigationMenuLink >
                                                <WifiMenu/>
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
const WifiMenu= ()=>{ 
    return(

        <div className="flex flex-row !text-xs justify-between p-2 items-center">
            <Label className="!text-xs">Wifi</Label>
            <Switch />
        </div> 
    )
}
const BlueMenu= ()=>{ 
    return( 
        <div className="flex flex-row !text-xs justify-between p-2 items-center">
            <Label className="!text-xs">Bluetooth</Label>
            <Switch />
        </div> 
    )
}
const BatteryMenu= ()=>{ 
    return( 
        <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-row !text-xs justify-between  items-center">
                <Label className="!text-xs">Battery</Label>
                <Label className="text-foreground/50 !text-xs font-thin">0%</Label>
                
            </div> 
            <hr className="border-foreground/15  my-1"  />
            <Label className="text-foreground/50 !text-xs font-thin">Power Source: Battery</Label>
            <hr className="border-foreground/15  my-1"  />
            <Label className="text-foreground/50 !text-xs font-thin">No Apps Using Significant Energy</Label>

        </div>
    )
}
const DateMenu= ()=>{
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[currentDate.getDay()];
    return( 
        <div className="flex flex-col gap-2 p-2 bg-background w-full card text-left">
            <div className="flex flex-col">
                <Label className=" !text-xs !font-extrabold !uppercase !text-destructive">{dayOfWeek}</Label>
                <Label className="text-foreground !text-2xl">{currentDate.getDay()}</Label>

            </div>
            <Label className="text-foreground/50 !text-xs font-thin">No events for today</Label>

        </div>
    )
}
