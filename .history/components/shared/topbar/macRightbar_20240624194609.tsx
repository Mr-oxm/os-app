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

const formatDate = (date:Date) => {
    const options = { 
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
    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                    <NavigationMenuList className="flex flex-row-reverse p-0 h-full">
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-2 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    datahere
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
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
                                    <Battery className="lucidBarIcon"/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
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
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
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