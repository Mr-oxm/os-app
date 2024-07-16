"use client"
import { Button } from "@/components/ui/button";
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
import Apple from '@/components/icons/apple'

import {NavbarLinks}from "@/lib/constants"
import { usePathname } from "next/navigation";
import Image from "next/image";


const macNavbar = () => {
    const pathname = usePathname();
    const programTitle = pathname?.split('/').pop() || '';
    const macButtonIcons=[
        <span className="w-5 h-5">
            <Apple/>
        </span>,
        <Image 
            src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
            alt="Start"
            width={200}
            height={200}
            className="w-6 h-6"
        />,
        <Image 
            src={'https://brandslogos.com/wp-content/uploads/images/large/linux-tux-logo-1.png'} 
            alt="Start"
            width={200}
            height={200}
            className="w-7 h-7"
        />, 
    ]
    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                <NavigationMenuList className="flex flex-row p-0 h-full items-stretch">
                    {NavbarLinks.map((menu, i) => (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger className={`capitalize bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40 ${menu.classname}`}>
                                {menu.Name==='Finder'? (programTitle? programTitle:menu.Name): (menu.Name)}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-2  sm:w-auto md:w-[30rem]  text-foreground">
                                {menu.content.map((item, index) => (
                                    item.name !== 'separator' ?
                                        <NavigationMenuLink key={index}>
                                            <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-primary hover:!text-primary-foreground text-foreground"
                                                disabled={!item.disabled}>
                                                {item.name} {item.shortcut && <span className="ml-auto opacity-50">{item.shortcut}</span>}
                                            </Button>
                                        </NavigationMenuLink>
                                        :
                                        <hr className="border-foreground/15 mx-3 my-1" key={index} />
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

export default macNavbar;
