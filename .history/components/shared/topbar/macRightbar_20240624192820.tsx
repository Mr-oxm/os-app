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
        <div>
            <NavigationMenu className="h-full !text-xs">
                    <NavigationMenuList className="flex flex-row p-0 h-full">
            
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40"> 
                                    <Settings/>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
                                            <NavigationMenuLink >
                                                <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                    Bo
                                                </Button>
                                            </NavigationMenuLink>
            
                                </NavigationMenuContent>
                            </NavigationMenuItem>
            
                    </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
export default macRightbar