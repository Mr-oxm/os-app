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
const macRightbar = () => {
    return (
        <NavigationMenu className="h-full !text-xs">
                <NavigationMenuList className="flex flex-row p-0 h-full">

                        <NavigationMenuItem key={menu.Name}>
                            <NavigationMenuTrigger className="bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40">
                                {menu.Name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-2  w-auto md:w-96 rounded-md border-2 border-border/20 text-foreground">
                                {menu.content.map((item, index) => (
                                    item === 'separator' ? 
                                        <hr className="border-foreground/15 px-4 " key={index} /> 
                                        
                                        : 
                                        <NavigationMenuLink key={index}>
                                            <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-background/30 text-foreground">
                                                {item}
                                            </Button>
                                        </NavigationMenuLink>
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
    )
}
export default macRightbar