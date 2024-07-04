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
    },
    {
        Name: 'View',
        content:['']
    },
    {
        Name: 'Go',
        content:['']
    },
    {
        Name: 'Go',
        content:['']
    },
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