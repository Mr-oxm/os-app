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
import { Bluetooth, Wifi, Battery, Settings} from "lucide-react"
const macRightbar = () => {
    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                    <NavigationMenuList className="flex flex-row-reverse p-0 h-full">
                    {/*------------ item start---------- */}
                    
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Settings className="text-xs"/>
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
                                <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Battery/>
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
                                <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Bluetooth/>
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
                                <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Wifi/>
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