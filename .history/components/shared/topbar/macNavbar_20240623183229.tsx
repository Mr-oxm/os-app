"use client"
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

const MenuLinks= [
    {
        Name: 'File',
        content:['']
    },
    {
        Name: 'Edit',
        content:['']
    }
]

const macNavbar = () => {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>File</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
export default macNavbar